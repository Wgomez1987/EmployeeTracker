const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    
);

const viewDepts = () => {
    const sql = `SELECT * FROM departments`
    // How to choose correct error message?
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(results);
    });
};

const viewRoles = () => {
    const sql = `SELECT * FROM roles`
    
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(results);
    });
};

const viewEmployees = () => {
    const sql = `SELECT * FROM employees`

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(results);
    });
};

const addDept = () => {
    const sql = `
    INSERT INTO 
    VALUES
    `

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(results);
    });
};

const addRole = () => {
    const sql = `
    INSERT INTO 
    VALUES
    `

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(results);
    });
};

const addEmployee = (first, last, role, manager) => {
    
    const roleID = db.query(`SELECT id FROM roles WHERE title = ${role}`);
    const managerID = db.query(`SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = ${manager}`);

    const sql = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (${first}, ${last}, ${roleID}, ${managerID})
    `

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(results);
    });
};

const updateEmployee = () => {
    const sql = `
    UPDATE
    SET
    WHERE
    `

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(results);
    });
};


module.exports = { viewDepts, viewRoles, viewEmployees, addDept, addRole, addEmployee, updateEmployee };