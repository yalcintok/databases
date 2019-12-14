const mysql = require('mysql');
const {promisify} = require('util');

const connection = mysql.createConnection({
    user: 'hyfuser',
    password: 'hyfpassword',
    host: 'localhost'
});

const connect = promisify(connection.connect.bind(connection));
const execQuery = promisify(connection.query.bind(connection));
const projects = [
    {
        proj_name: 'Project 1',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 2',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 3',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 4',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 5',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 6',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 7',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 8',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 9',
        starting_date: new Date(),
        ending_date: new Date()
    },
    {
        proj_name: 'Project 10',
        starting_date: new Date(),
        ending_date: new Date()
    }
]
const employees = [
    {
        emp_name: 'Employee 1',
        salary: 1450,
        reports_to: null
    },
    {
        emp_name: 'Employee 2',
        salary: 1450,
        reports_to: 1
    },
    {
        emp_name: 'Employee 3',
        salary: 1450,
        reports_to: 1
    },
    {
        emp_name: 'Employee 4',
        salary: 1450,
        reports_to: 2
    },
    {
        emp_name: 'Employee 5',
        salary: 1450,
        reports_to: 2
    },
    {
        emp_name: 'Employee 6',
        salary: 1450,
        reports_to: 2
    },
    {
        emp_name: 'Employee 7',
        salary: 1450,
        reports_to: 2
    },
    {
        emp_name: 'Employee 8',
        salary: 1450,
        reports_to: 3
    },
    {
        emp_name: 'Employee 9',
        salary: 1450,
        reports_to: 3
    },
    {
        emp_name: 'Employee 10',
        salary: 1450,
        reports_to: null
    }
]
const departments = [
    {
        dept_no: 1,
        dept_name: 'A',
        manager: 4
    },
    {
        dept_no: 2,
        dept_name: 'B',
        manager: 3
    },
    {
        dept_no: 3,
        dept_name: 'C',
        manager: 2
    },
    {
        dept_no: 4,
        dept_name: 'D',
        manager: 2
    },
    {
        dept_no: 5,
        dept_name: 'E',
        manager: 2
    },
    {
        dept_no: 6,
        dept_name: 'F',
        manager: 2
    },
    {
        dept_no: 7,
        dept_name: 'G',
        manager: 2
    },
    {
        dept_no: 8,
        dept_name: 'H',
        manager: 3
    },
    {
        dept_no: 9,
        dept_name: 'I',
        manager: 1
    },
    {
        dept_no: 10,
        dept_name: 'K',
        manager: 1
    },
]
const main = async () => {
    try {
        await connect();

        await execQuery('CREATE DATABASE IF NOT EXISTS company');

        await execQuery('USE company');

        await execQuery(`CREATE TABLE IF NOT EXISTS Employees(emp_no int primary key auto_increment, emp_name varchar(50), salary float, reports_to int, foreign key (reports_to) references Employees(emp_no))`) 

        await execQuery(`CREATE TABLE IF NOT EXISTS Departments(dept_no int primary key auto_increment, dept_name varchar(255), manager varchar(50))`);

        await execQuery(`CREATE TABLE IF NOT EXISTS Projects(proj_no int primary key auto_increment, proj_name varchar(255), starting_date datetime, ending_date datetime)`);

        projects.forEach(async (proj) => {
            await execQuery('INSERT INTO Projects SET ?', proj)
        });

        employees.forEach(async(emp) => {
            await execQuery('INSERT INTO Employees SET ?', emp)
        });
        departments.forEach(async(dep) => {
            await execQuery('INSERT INTO Departments SET ?', dep)
        });
    } catch (err) {
        console.error(err);
    } finally {
        connection.end();
    }
}
main();
