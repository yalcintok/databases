const express = require('express');
const mysql = require('mysql');
const {employees, departments} = require('./specification.js');

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

app.get('/EmployeesWithManagerName', (req, res) => {
  let sql = `SELECT emp1.*, 
  emp2.manager AS "manager's_id", emp2.full_name AS "manager's full_name" 
  FROM employees emp1, employees emp2 
  WHERE emp1.manager = emp2.employee_no;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('All employees and their managers represent.');
  });
});

app.get('/allEmployees&DepartmentTitle', (req, res) => {
  let sql = `SELECT employees.*, departments.dept_no, departments.title FROM departments 
  LEFT JOIN employees ON employees.department_no = departments.dept_no;`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('All employees and their departments title represent');
  });
});

app.listen('3000', () => {
  console.log('Server started');
}); 