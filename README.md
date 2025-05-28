-- Create the database
CREATE DATABASE shop;

-- Table structure for table `departments`
CREATE TABLE departments (
dept_no CHAR(4) NOT NULL,
dept_name VARCHAR(40) NOT NULL,
PRIMARY KEY (dept_no),
UNIQUE KEY (dept_name)
);

-- Dumping data for table `departments`
INSERT INTO departments (dept_no, dept_name) VALUES
('d001', 'Marketing'),
('d002', 'Finance'),
('d003', 'Human Resources'),
('d004', 'Production'),
('d005', 'Development'),
('d006', 'Quality Management'),
('d007', 'Sales'),
('d008', 'Research'),
('d009', 'Customer Service');

-- Table structure for table `employees`
CREATE TABLE employees (
emp_no INT NOT NULL AUTO_INCREMENT, -- Or remove AUTO_INCREMENT if you have predefined emp_no
birth_date DATE NOT NULL,
first_name VARCHAR(14) NOT NULL,
last_name VARCHAR(16) NOT NULL,
gender ENUM ('M','F','X') NOT NULL, -- X for Other/Non-binary
hire_date DATE NOT NULL,
PRIMARY KEY (emp_no)
);
-- Set AUTO_INCREMENT start value if not using predefined emp_no values that start from 1
-- ALTER TABLE employees AUTO_INCREMENT = 10001;

-- Dumping data for table `employees`
INSERT INTO employees (emp_no, birth_date, first_name, last_name, gender, hire_date) VALUES
(10001, '1953-09-02', 'Georgi', 'Facello', 'M', '1986-06-26'),
(10002, '1964-06-02', 'Bezalel', 'Simmel', 'F', '1985-11-21'),
(10003, '1959-12-03', 'Parto', 'Bamford', 'M', '1986-08-28'),
(10004, '1954-05-01', 'Chirstian', 'Koblick', 'M', '1986-12-01'),
(10005, '1955-01-21', 'Kyoichi', 'Maliniak', 'M', '1989-09-12'),
(10006, '1953-04-20', 'Anneke', 'Preusig', 'F', '1989-06-02'),
(10007, '1957-05-23', 'Tzvetan', 'Zielinski', 'F', '1989-02-10'),
(10008, '1958-02-19', 'Saniya', 'Kalloufi', 'M', '1994-09-15'),
(10009, '1952-04-19', 'Sumant', 'Peac', 'F', '1985-02-18'),
(10010, '1963-06-01', 'Duangkaew', 'Piveteau', 'F', '1989-08-24');

-- Table structure for table `dept_emp` (linking employees to departments)
CREATE TABLE dept_emp (
emp_no INT NOT NULL,
dept_no CHAR(4) NOT NULL,
from_date DATE NOT NULL,
to_date DATE NOT NULL, -- Use a far future date like '9999-01-01' for current employment
PRIMARY KEY (emp_no, dept_no),
FOREIGN KEY (emp_no) REFERENCES employees (emp_no) ON DELETE CASCADE,
FOREIGN KEY (dept_no) REFERENCES departments (dept_no) ON DELETE CASCADE
);

-- Dumping data for table `dept_emp`
INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date) VALUES
(10001, 'd005', '1986-06-26', '9999-01-01'), -- Georgi in Development
(10002, 'd007', '1985-11-21', '9999-01-01'), -- Bezalel in Sales
(10003, 'd004', '1986-08-28', '1995-12-03'), -- Parto in Production (past)
(10003, 'd008', '1995-12-04', '9999-01-01'), -- Parto in Research (current)
(10004, 'd004', '1986-12-01', '9999-01-01'), -- Chirstian in Production
(10005, 'd003', '1989-09-12', '9999-01-01'), -- Kyoichi in Human Resources
(10006, 'd004', '1989-06-02', '9999-01-01'), -- Anneke in Production
(10007, 'd008', '1989-02-10', '9999-01-01'), -- Tzvetan in Research
(10008, 'd005', '1994-09-15', '2000-01-15'), -- Saniya in Development (past)
(10008, 'd001', '2000-01-16', '9999-01-01'), -- Saniya in Marketing (current)
(10009, 'd006', '1985-02-18', '9999-01-01'), -- Sumant in Quality Management
(10010, 'd006', '1989-08-24', '1996-11-09'), -- Duangkaew in Quality Management (past)
(10010, 'd004', '1996-11-10', '9999-01-01'); -- Duangkaew in Production (current)

-- Table structure for table `salaries`
CREATE TABLE salaries (
emp_no INT NOT NULL,
salary INT NOT NULL,
from_date DATE NOT NULL,
to_date DATE NOT NULL, -- Use a far future date like '9999-01-01' for current salary
PRIMARY KEY (emp_no, from_date),
FOREIGN KEY (emp_no) REFERENCES employees (emp_no) ON DELETE CASCADE
);

-- Dumping data for table `salaries`
INSERT INTO salaries (emp_no, salary, from_date, to_date) VALUES
(10001, 60117, '1986-06-26', '1987-06-26'),
(10001, 62102, '1987-06-26', '1988-06-25'),
(10001, 66074, '1988-06-25', '1989-06-25'),
(10001, 66596, '1989-06-25', '1990-06-25'),
(10001, 66961, '1990-06-25', '1991-06-25'),
(10001, 71046, '1991-06-25', '1992-06-24'),
(10001, 74333, '1992-06-24', '9999-01-01'), -- Current Salary for 10001
(10002, 65828, '1985-11-21', '1996-08-03'),
(10002, 72365, '1996-08-03', '9999-01-01'), -- Current Salary for 10002
(10003, 40000, '1986-08-28', '1995-12-03'),
(10003, 43699, '1995-12-04', '9999-01-01'), -- Current Salary for 10003
(10004, 40054, '1986-12-01', '1990-12-01'),
(10004, 50054, '1990-12-01', '9999-01-01'), -- Current Salary for 10004
(10005, 78228, '1989-09-12', '9999-01-01'), -- Current Salary for 10005
(10006, 40000, '1989-06-02', '1995-06-02'),
(10006, 55000, '1995-06-02', '9999-01-01'), -- Current Salary for 10006
(10007, 56724, '1989-02-10', '9999-01-01'), -- Current Salary for 10007
(10008, 46671, '1994-09-15', '2000-01-15'),
(10008, 52600, '2000-01-16', '9999-01-01'), -- Current Salary for 10008
(10009, 60929, '1985-02-18', '9999-01-01'), -- Current Salary for 10009
(10010, 72488, '1989-08-24', '1996-11-09'),
(10010, 80240, '1996-11-10', '9999-01-01'); -- Current Salary for 10010
