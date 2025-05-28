const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // 1. Import the 'path' module

const app = express();
const port = 3000;

// 2. Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// --- Database Connection ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aabb11111111', // Ensure this is correct
    database: 'shop',
    port: 3307 // Ensure this is correct
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Successfully connected to the database as ID', db.threadId);
});

// --- Routes ---
// Root route (Dashboard homepage)
app.get('/', (req, res) => {
    res.render('index', { title: 'Employee Dashboard' });
});

// List departments
app.get('/departments', (req, res) => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).send('Error fetching data from database.');
        }
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
        if (err) {
            console.error('Error fetching employees for department ' + deptNo + ':', err);
            return res.status(500).send('Error fetching data from database.');
        }
        res.render('employees', { employees: results, dept_no: deptNo });
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
        if (err) {
            console.error('Error fetching details for employee ' + empNo + ':', err);
            return res.status(500).send('Error fetching data from database.');
        }
        if (results.length === 0) {
            return res.status(404).send('Employee not found.');
        }
        res.render('employee_detail', { employee: results[0], salaries: results });
    });
});

// --- Start the server ---
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});