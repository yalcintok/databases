const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const connect = promisify(connection.connect.bind(connection));
const executeQuery = promisify(connection.query.bind(connection));

const main = async () => {
  try {
    await connect();

    //What are the names of countries with population greater than 8 million?
    await executeQuery(
      'SELECT name, population FROM country WHERE population > 8000000',
    );

    //What are the names of countries that have “land” in their names?
    await executeQuery(
      `SELECT name FROM country WHERE name LIKE '%land%'`,
    );

    //What are the names of the cities with population in between 500,000 and 1 million?
    await executeQuery(
      `SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;`,
    );

    //What's the name of all the countries on the continent ‘Europe’?
    await executeQuery(
      `SELECT name FROM country WHERE continent = 'Europe'`,
    );

    //List all the countries in the descending order of their surface areas.
    await executeQuery(
      `SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;`,
    );

    //What are the names of all the cities in the Netherlands?
    await executeQuery(
      `SELECT name, countrycode from city where countrycode LIKE 'NLD';`,
    );

    //What is the population of Rotterdam?
    await executeQuery(
      `SELECT population, name FROM city WHERE name LIKE 'Rotterdam';`,
    );

    //What's the top 10 countries by Surface Area?
    await executeQuery(
      `SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
    );

    //What's the top 10 most populated cities?
    await executeQuery(
      `SELECT name, population FROM city ORDER BY population DESC LIMIT 10;`,
    );

    //What is the population number of the world?
    await executeQuery(
      `SELECT SUM(population) FROM country;`,
    );
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

main();