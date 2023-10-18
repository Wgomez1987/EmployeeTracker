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
                case 'View All Employees': viewEmployees(starterPrompt);
                break;
                case 'Add Employee': addEmployeePrompt();
                break;
               
                break;
                case 'View All Roles': viewRoles(starterPrompt);
                break;
            
                break;
                case 'View All Departments': viewDepts(starterPrompt);
                break;
               
                break;
                case 'Add Role': addRolePrompt();
                break;
            }
        });
};
const addRolePrompt = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the name of the new role:'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Enter the salary for this role:'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department does this role belong to?',
                choices: getDepartments()
            }
        ])
        .then(({ roleTitle, roleSalary, departmentId }) => {
            addRole(roleTitle, roleSalary, departmentId);
        })
        .then(() => starterPrompt())
};

const addEmployeePrompt = () => {

    const getRoles = () => {
       return db.query(`SELECT title AS name FROM roles`)
    };

    const getManagers = () => {
        return db.query(`SELECT CONCAT(first_name, " ", last_name) AS name FROM employees`)
     };

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
};
function viewEmployees() {
    findEmployees().then(function([rows]) {
        const employees = rows;
        console.table(employees);
    })
    .then(function() {
        starterPrompt();

    })
}
starterPrompt();
