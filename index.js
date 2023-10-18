const inquirer = require('inquirer');
const { viewDepts, viewRoles, findEmployees, addDept, addRole, addEmployee, updateEmployee } = require('./sql');
const mysql = require('mysql2');


const starterPrompt = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'landing',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
            },
        ])
        .then(({ landing }) => {
            switch (landing) {
                case 'View All Employees': viewEmployees();
                break;
                case 'Add Employee': addEmployeePrompt();
                break;
                case 'Update Employee Role': updateEmployeePrompt(); // You may need to add a function for this
                break;
                case 'View All Roles': viewRoles();
                break;
                case 'Add Role': addRolePrompt();
                break;
                case 'View All Departments': viewDepts();
                break;
                case 'Add Department': addDepartmentPrompt(); // You may need to add a function for this
                break;
            }
        });
};

function viewEmployees() {
    findEmployees().then(function([rows]) {
        const employees = rows;
        console.table(employees);
    })
    .then(function() {
        starterPrompt();
    });
};

const addEmployeePrompt = async () => {
    const roleChoices = await getRoles();
    const managerChoices = await getManagers();

    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "what's the employee's first name?"
        },
        {
            type: 'input',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleChoices()
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: managerChoices()
        }
    ])
    .then(({ firstName, lastName, role, manager}) => {
        addEmployee(firstName, lastName, role, manager)
    })
    .then(() => starterPrompt());
    };

const getManagers = async () => {
    const [rows] = await db.promise().query(`SELECT CONCAT(first_name, " ", last_name) AS name FROM employees`);
    return rows.map(row => row.name);


    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: getRoles()
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: getManagers()
            }
        ])
        .then(({ firstName, lastName, role, manager }) => {
            addEmployee(firstName, lastName, role, manager)
        })
        .then(() => starterPrompt())

const addRolePrompt = () => {
    const getDepartments = () => {
        return db.query(`SELECT department_name AS name FROM departments`)
    };

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the role title:'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary for this role:'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does this role belong to?',
                choices: getDepartments()
            }
        ])
        .then(({ roleTitle, roleSalary, department }) => {
            addRole(roleTitle, roleSalary, department);
        })
        .then(() => starterPrompt());
};
const updateEmployeePrompt = () => {
    const getEmployees = () => {
        return db.query(`SELECT CONCAT(first_name, " ", last_name) AS name FROM employees`);
    };

    const getRoles = async () => {
        const [rows] = await db.promise().query(`SELECT title AS name FROM roles`);
       return rows.map(row => row.name);
    };

    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee do you want to update?',
                choices: getEmployees()
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Select the new role for the employee:',
                choices: getRoles()
            }
        ])
        .then(({ employee, newRole }) => {
            updateEmployee(employee, newRole);
        })
        .then(() => starterPrompt());
};

const addDepartmentPrompt = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department:'
            }
        ])
        .then(({ departmentName }) => {
            addDept(departmentName);
        })
        .then(() => starterPrompt());
};

function viewEmployees() {
    findEmployees().then(function([rows]) {
        const employees = rows;
        console.table(employees);
    })
    .then(function() {
        starterPrompt();
    });
}

starterPrompt();