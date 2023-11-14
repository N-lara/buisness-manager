// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

// ** bonus **
// Update employee managers.
// View employees by manager.
// View employees by department.
// Delete departments, roles, and employees.
// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
//  https://www.npmjs.com/package/mysql2

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


inquirer
  .prompt([
    /* Pass your questions in here */
    //home question
    {
        type: 'list',
        name: 'action',
        message: 'what would you like to do?',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit'],
    },
    //add dpt
    {
        type: 'input',
        name: 'newDpt',
        message: 'What is the name of the new department?',
    },
    //add role
    {
      type: 'list',
      name: 'roleDpt',
      message: 'What department is this new role',
      choices: deptList
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
    //add emp
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'What is the first name of the new employee?',
        validate: async (input) => {
          if (input.length < 3) {
             return 'min 3 letters';
          }
    
          return true
        }
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: 'What is the last name of the new employee?',
    },
    {
      type: 'list',
      name: 'employeeDpt',
      message: 'What department is this new employee?',
      choices: dptList
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'What role is this new employee?',
        choices: roleList
    },
    {
      type: 'list',
      name: 'employeeMgr',
      message: 'Who is the manager of this new employee?',
      choices: mgrList
    },
    //update role
    {
      type: 'list',
      name: 'updateEmp',
      message: 'Which employee are you updating?',
      choices: empList
    },
    {
      type: 'list',
      name: 'updatedpt',
      message: 'What department is this employee going into?',
      choices: dptList
    },
    {
      type: 'list',
      name: 'updaterole',
      message: 'What role is this employee going into?',
      choices: roleList
    },
    {
      type: 'list',
      name: 'updateMgr',
      message: 'What manager is this employee going under?',
      choices: mgrList
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
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