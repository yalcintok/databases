const express = require('express');
const mysql = require('mysql');
const {employees} = require('./specification.js');

const app = express();

const database = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

database.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

app.get('/createdatabase', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS company_sample_db_week2';
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('New database is ready to use.');
  });
});

app.get('/use', (req, res) => {
  let sql = 'USE company_sample_db_week2';
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('You can manage now company_sample_db_week2');
  });
});

app.get('/createEmployeeTable', (req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS employees (
    employee_no INT PRIMARY KEY AUTO_INCREMENT, 
    full_name VARCHAR(250), 
    salary FLOAT, 
    address VARCHAR(250), 
    manager INT, 
    department_no INT, 
    FOREIGN KEY(manager) REFERENCES employees(employee_no))`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    res.send('Employees table is ready.');
  });
});

employees.forEach(employee => {
  let sql = `INSERT INTO employees SET ?`;
  database.query(sql, employee, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

app.get('/addForeignKey', (req, res) => {
  let sql = 'ALTER TABLE employees ADD Constraint FOREIGN KEY(department_no) REFERENCES departments(dept_no)';
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Foreign Key inserted');
  });
});

app.listen('3000', () => {
  console.log('Server started..');
});