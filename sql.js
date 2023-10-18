const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company_db'
});

const viewDepts = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(results);
    });
};

const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err.message);
            return;
        }
    
    });
};

const findEmployees = () => {
    const sql = `SELECT * FROM employees`;
    return db.promise().query(sql)

   
};

const addDept = (departmentName) => {
    const sql = `INSERT INTO departments SET ?`;
    return db.promise().query(sql, departmentName);
        }

const addRole = (roleTitle) => {
    const sql = `INSERT INTO roles SET ?`;
    return db.promise().query(sql, roleTitle)
}
const addEmployee = (first, last, role, manager) => {
    
    const sqlRoleID = `SELECT id FROM roles WHERE title = ?`;
    const sqlManagerID = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ?`;

    let roleID, managerID;


    db.query(sqlRoleID, [role], (err, results) => {
        if (err) {
            console.error(err.message);
            return;
        }
        roleID = results[0].id; 

        db.query(sqlManagerID, [manager], (err, results) => {
            if (err) {
                console.error(err.message);
                return;
            }
            managerID = results[0].id; 

            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            db.query(sql, [first, last, roleID, managerID], (err, results) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                console.log(results);
            });
        });
    });
};

const updateEmployee = (employeeId, newRoleId) => {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    db.query(sql, [newRoleId, employeeId], (err, results) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(results);
    });
};

module.exports = { viewDepts, viewRoles, findEmployees, addDept, addRole, addEmployee, updateEmployee };