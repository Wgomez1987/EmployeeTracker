INSERT INTO departments (id, name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Finance"),
       (004, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (001, "Sales Lead",  100000, 1),
       (002, "Salesperson", 80000, 1),
       (003, "Lead Engineer", 150000, 2),
       (004, "Software Engineer", 120000, 2),
       (005, "Account Manager", 160000, 3),
       (006, "Accountant", 125000, 3),
       (007, "Legal Team Lead", 250000, 4),
       (008, "Lawyer", 190000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (001, "John", "Doe", 1, NULL),
       (002, "Mike", "Chan", 2, 1),
       (003, "Ashley", "Rodriguez", 3, NULL),
       (004, "Kevin", "Tupik", 4, 3),
       (005, "Kunal", "Singh", 5, NULL),
       (006, "Malia", "Brown", 6, 5),
       (007, "Sarah", "Lourd", 7, NULL),
       (008, "Tom", "Allen", 8, 7);