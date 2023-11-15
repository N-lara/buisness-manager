const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

let answer;
let action;

let roleList =[];
let dptList = [];

function getData(){
  db.query('SELECT name FROM department;', function (err, results) {
    dptList = results;
  });
  db.query('SELECT title FROM role;', function (err, results) {
    roleList = results;
  });
};
getData();


//prompts main questions
function home(){
  getData;
  inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'list',
      name: 'action',
      message: 'what would you like to do?',
      choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit'],
  },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    action = answers.action
    actionProcesser(action);
    return action;
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log('error:' + error);
    } else {
      // Something else went wrong
      console.log('an unexpected error occurred');
    }
  });
}

function actionProcesser(action){
  if(action === 'View all employees'){
    showEmployees();
  }else if(action === 'Add employee'){
    promptEmployee();
  }else if(action === 'Update employee role'){
    promptUpdate();
  }else if(action === 'View all roles'){
    showRoles();
  }else if(action === 'Add role'){
    promptRole();
  }else if(action === 'View all departments'){
    showDepartments();
  }else if(action === 'Add department'){
    promptDepartment();
  }else if(action === 'Quit'){
    return;
  }
}
//does query to show departments
const showDepartments = ()=>{
  db.query('SELECT * FROM department ORDER BY id asc;', function (err, results) {
    console.info(results);
    home();
  });
};
//does query to show roles 
const showRoles = ()=>{
  db.query('SELECT role.*, department.name FROM role INNER JOIN department ON role.department_id = department.id ORDER BY id asc;', function (err, results) {
    console.info(results);
    home();
  });
};
//does query to show employees 
const showEmployees = ()=>{
  db.query(
    `SELECT employee.*, role.title, role.salary, role.department_id, department.name FROM employee INNER JOIN role on employee.role_id = role.id INNER JOIN department ON department_id = department.id ORDER BY id asc;`,
    function (err, results) {
    console.info(results);
    home();
  });
};

function promptDepartment(){
  inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      name: 'newDpt',
      message: 'What is the name of the new department?',
   },
  ])
  .then((answer) => {
    // Use user feedback for... whatever!!
    // answer = answers;
      db.query('INSERT INTO department SET ?', { name: answer.newDpt }, (err) => {
        if (err) throw err;
        console.log(`successfully added new department ${answer.newDpt}`);
        home();
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
};

function promptRole(){
  inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      name: 'roleDpt',
      message: 'What department is this new role',
    },
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the new role name'
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the new role salary'
    },
  ])
  .then((answer) => {
    // Use user feedback for... whatever!!
    db.execute(
      `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answer.newRole, answer.roleSalary, answer.roleDpt], function(err, results){
        console.info(`successfully added role ${answer.newRole}`)
        home();
       });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
};

function promptEmployee(){
  inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      name: 'employeeFirstName',
      message: 'What is the first name of the new employee?',
  },
  {
    type: 'input',
    name: 'employeeLastName',
    message: 'What is the last name of the new employee?',
  },
  {
      type: 'input',
      name: 'employeeRole',
      message: 'What is the role id of this new employees job?',
  },
  {
    type: 'input',
    name: 'employeeMgr',
    message: 'what is the employee id for the manager of this new employee?',
  },
  ])
  .then((answer) => {
    // Use user feedback for... whatever!!
    db.execute(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.employeeFirstName, answer.employeeLastName, answer.employeeRole, answer.employeeMgr], function(err, results){
        if(err) throw err;
        console.info(`successfully added new employee ${answer.employeeFirstName} ${answer.employeeLastName}`);
        home();
       });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
};


function promptUpdate(){
  inquirer
    .prompt([
      //update role
      {
        type: 'input',
        name: 'EmpFirst',
        message: 'what is the fist name of the employee you would like to update?',
      },
      {
        type: 'input',
        name: 'empLast',
        message: 'what is the last name of the employee you would like to update?',
      },
      {
        type: 'input',
        name: 'updateRole',
        message: 'What role id is the job this employee going into?',
      },
      {
        type: 'input',
        name: 'updateMgr',
        message: 'What is the manager id of the manager is this employee going under?',
      },
    ])
    .then((answer) => {
      // Use user feedback for... whatever!!
      db.execute(
        `UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ? AND last_name = ?;`, [answer.updateRole, answer.updateMgr, answer.empFirst, answer.empLast], function(err, results){
          if(err) throw err;
          console.info(`successfully updated employee ${answer.empFirst} ${answer.empLast}`);
          home();
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log('error:' + error);
      } else {
        // Something else went wrong
        console.log('an unexpected error occurred');
      }
  });
}

home();