const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aabb11111111',
    database: 'shop',
    port: 3307 // use your correct port
});

// List departments
app.get('/departments', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        res.render('departments', { departments: results });
    });
});

// List employees in department
app.get('/departments/:dept_no/employees', (req, res) => {
    const deptNo = req.params.dept_no;
    db.query(`
    SELECT e.emp_no, e.first_name, e.last_name
    FROM employees e
    JOIN dept_emp de ON e.emp_no = de.emp_no
    WHERE de.dept_no = ?`, [deptNo], (err, results) => {
        res.render('employees', { employees: results });
    });
});

// Employee details
app.get('/employees/:emp_no', (req, res) => {
    const empNo = req.params.emp_no;
    db.query(`
    SELECT e.*, s.salary, YEAR(s.from_date) AS year
    FROM employees e
    JOIN salaries s ON e.emp_no = s.emp_no
    WHERE e.emp_no = ?
    ORDER BY year`, [empNo], (err, results) => {
        res.render('employee_detail', { employee: results[0], salaries: results });
    });
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
