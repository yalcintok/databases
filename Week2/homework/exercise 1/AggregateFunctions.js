const express = require('express');
const mysql = require('mysql');
const {employees,departments} = require('./specification.js');

const app = express();

const database = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'company_sample_db_week2'
});

database.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

//All department numbers and the number of employees working there.
app.get('/DepartmentAndEmployees', (req, res) => {
  let sql = `SELECT employees.department_no, COUNT(*) FROM employees 
  RIGHT JOIN departments ON employees.department_no = departments.dept_no GROUP BY  department_no;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('All department numbers and the number of employees working there');
  });
});

//Sum of the salaries of all employees.
app.get('/sumOfSalaries', (req, res) => {
  let sql = `SELECT SUM(salary) FROM employees;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Sum of the salaries of all employees');
  });
});

//Average of the salaries of all employees.
app.get('/averageOfSalaries', (req, res) => {
  let sql = `SELECT AVG(salary) FROM employees;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Average of the salaries of all employees');
  });
});

//Sum of the salaries of the employees per department.
app.get('/SalariesOfEmployeesDepartment', (req, res) => {
  let sql = `SELECT department_no, SUM(salary) FROM employees GROUP BY department_no;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Sum of the salaries of the employees per department');
  });
});

//Minimum and maximum od the salaries per department.
app.get('/minAndMaxSalariesPerDepartment', (req, res) => {
  let sql = `SELECT department_no, MIN(salary),MAX(salary) FROM employees GROUP BY department_no;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Minimum and maximum od the salaries per department');
  });
});

//For each salary value, return the number of employees paid.
app.get('/theNumberOfEmployeesPaid', (req, res) => {
  let sql = `SELECT salary, COUNT(*) FROM employees GROUP BY salary ORDER BY salary;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('For each salary value, return the number of employees paid');
  });
});

app.listen('3000', () => {
  console.log('Server started');
}); 