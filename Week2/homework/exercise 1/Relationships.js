const express = require('express');
const mysql = require('mysql');
const {departments} = require('./specification.js');

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

app.get('/createDepartmentTable', (req, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS departments (
    dept_no INT PRIMARY KEY, 
    title VARCHAR(250), 
    description VARCHAR(250), 
    address VARCHAR(250))`;
  database.query(sql, (err, result) => {
    if (err) throw err;
    console.table(result);
    res.send('Departments table is ready to use');
  });
});

departments.forEach(department => {
  let sql = 'INSERT INTO departments SET ?';
  database.query(sql, department, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

app.listen('3000', () => {
  console.log('Server started');
}); 