INSERT INTO department (name id)
VALUES ("Sales", 1),
       ("Customer service", 2),
       ("Human resources", 3),
       ("Vehicle service", 4),
       ("Finance", 5),
       ("legal", 6),
       ("Corperate", 7)
       ("support", 8);

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales manager", 100000, 1),
       (2, "Customer service manager", 100000, 2),
       (3, "Human resources manager", 100000, 3),
       (4, "Service foreman", 100000, 4),
       (5, "General Manager", 180000, 7),
       (6, "Service tech", 65000, 4),
       (7, "Lube tech", 40000, 4),
       (8, "Detail tech", 36000, 4),
       (9, "Roadside service tech", 60000, 4),
       (10, "Porter", 32000, 2),
       (11, "Salesperson", 80000, 1),
       (12, "Service writer", 56000, 1),
       (13, "Receptionist", 40000, 2),
       (14, "Custodian", 38000, 8),
       (15, "Part runner", 38000, 8),
       (16, "Quartermaster", 45000, 8),
       (17, "Aquisition specialist", 70000, 1),
       (18, "Lawyer", 120000, 6)
       (19, "Accountant", 50000, 5),
       (20, "HR representative", 50000, 3)
       (21, "Head custodian", 50000, 8);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Gary", "Rider", 5, null),
       (2, "John", "Redcorn", 2, 1),
       (3, "George", "Looney",3 , 1),
       (4, "Brad", "Pfiefer", 4, 1),
       (5, "Hank", "Hill", 1, 1),
       (6, "Joe", "Schmoe", 21, 1),
       (7, "Shaun", "Yu", 9, 4),
       (8, "Kyle", "Park", 7, 4),
       (9, "Viktor", "Green", 10, 2),
       (10, "Pamela", "Jones", 13, 2),
       (11, "Jane", "Doe", 20, 3),
       (12, "Daniel", "Moore", 12, 5),
       (13, "Joshua", "Garcia", 14, 6),
       (14, "Manuel", "Salas", 11, 5),
       (15, "Luke", "Hisenburg", 16, 4),
       (16, "Johan", "LeBlanc", 17, 5),
       (17, "Marty", "McFly", 19, 1),
       (18, "Mark", "King", 18, 1),
       (19, "Mike", "Hawk", 8, 4),
       (20, "Billy", "Mayes", 11, 5),
       (21, "Jose", "Reed", 15, 4),
       (22, "Martin", "Hastings", 6, 4),
       (23, "Ricky", "Bobby", 6, 4);
       
       
