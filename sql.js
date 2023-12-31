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
        console.table(results);
    });
};

// const viewRoles = () => {
//     const sql = `SELECT * FROM roles`;
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error(err.message);
//             return;
//         }
//         console.table(results);
//     });
// };

const findEmployees = () => {
    const sql = `SELECT * FROM employees`;
    return db.promise().query(sql)
};

const findRoles = () => {
    const sql = `SELECT * FROM roles`;
    return db.promise().query(sql)
};

const findDepartments = () => {
    const sql = `SELECT * FROM departments`;
    return db.promise().query(sql)
}

const addDept = (departmentName) => {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    db.query(sql, departmentName);
};

const addRole = (roleTitle, roleSalary, departmentName) => {
    const sqlDepartmentId = `SELECT id FROM departments WHERE name = ?`
    let departmentId;
    db.query(sqlDepartmentId, [departmentName], (err, results) => {
        if (err) {
            console.error(err.message);
            return;
        }
        departmentId = results[0].id;
    });
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    db.query(sql, [roleTitle, roleSalary, departmentId], (err, results) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Added role successfully!');
    });
};

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
                // console.log(results);
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

module.exports = { db, findDepartments, viewDepts, findEmployees, addDept, addRole, addEmployee, updateEmployee, findRoles };