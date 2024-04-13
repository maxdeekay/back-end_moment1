const { Client } = require("pg");
require("dotenv").config();

// Ansluter till databasen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

// Felhantering
client.connect((err) => {
    if (err) console.log("Fel vid anslutning" + err);
    else console.log("Ansluten till databasen...");
});

// Skapar tabell 'courses'
client.query(`
    DROP TABLE IF EXISTS courses;
    CREATE TABLE courses (
        id          SERIAL PRIMARY KEY,
        coursecode  VARCHAR(255),
        coursename  VARCHAR(255),
        syllabus    VARCHAR(255),
        progression VARCHAR(2)
    )
`);