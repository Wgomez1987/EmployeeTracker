const inquirer = require('inquirer');
const { db, viewDepts, findEmployees, addDept, addRole, addEmployee, updateEmployee, findRoles, findDepartments } = require('./sql');
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
                case 'Update Employee Role': updateEmployeePrompt();
                    break;
                case 'View All Roles': viewRoles();
                    break;
                case 'Add Role': addRolePrompt();
                    break;
                case 'View All Departments': viewDepartments();
                    break;
                case 'Add Department': addDepartmentPrompt();
                    break;
            }
        });
};

function viewEmployees() {
    findEmployees().then(function ([rows]) {
        const employees = rows;
        console.table(employees);
    })
        .then(function () {
            starterPrompt();
        });
};

function viewRoles() {
    findRoles().then(function ([rows]) {
        const roles = rows;
        console.table(roles);
    })
        .then(function () {
            starterPrompt();
        });
};

function viewDepartments() {
    findDepartments().then(function ([rows]) {
        const roles = rows;
        console.table(roles);
    })
        .then(function () {
            starterPrompt();
        });
};

const getDepartments = async () => {
    const [rows] = await db.promise().query(`SELECT name FROM departments`)
    return rows.map(row => row.name);
};

const getManagers = async () => {
    const [rows] = await db.promise().query(`SELECT CONCAT(first_name, " ", last_name) AS name FROM employees`);
    return rows.map(row => row.name);
};

const getRoles = async () => {
    const [rows] = await db.promise().query(`SELECT title AS name FROM roles`);
    return rows;
};

const getEmployees = async () => {
    const [rows] = await db.promise().query(`SELECT CONCAT(first_name, " ", last_name) AS name FROM employees`);
    return rows.map(row => row.name);
};


const addEmployeePrompt = async () => {
    const managerChoices = await getManagers();
    const roleChoices = await getRoles();

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "what's the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "what's the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: getRoles
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: managerChoices
            }
        ])
        .then(({ firstName, lastName, role, manager }) => {
            addEmployee(firstName, lastName, role, manager)
        })
        .then(() => starterPrompt());
};


const addRolePrompt = async () => {
    const departmentChoices = await getDepartments()
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
                choices: departmentChoices
            }
        ])
        .then(({ roleTitle, roleSalary, department }) => {
            addRole(roleTitle, roleSalary, department);
        })
        .then(() => starterPrompt());
};
const updateEmployeePrompt = async () => {
    const employeeChoices = await getEmployees();
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee do you want to update?',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Select the new role for the employee:',
                choices: getRoles
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


starterPrompt();