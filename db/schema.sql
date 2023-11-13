/*department
id: INT PRIMARY KEY
name: VARCHAR(30) to hold department name

role
id: INT PRIMARY KEY
title: VARCHAR(30) to hold role title
salary: DECIMAL to hold role salary
department_id: INT to hold reference to department role belongs to ** forign dep id

employee
id: INT PRIMARY KEY 
first_name: VARCHAR(30) to hold employee first name
last_name: VARCHAR(30) to hold employee last name
role_id: INT to hold reference to employee role  ** forign role id
manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager) ** forign id to employee id of manager
*/