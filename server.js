const { Client } = require("pg");
const express = require("express");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded( { extended: true } )); // Aktivera formulärdata

// Anslut till databasen
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

client.connect((err) => {
    (err) ? console.log("Fel vid anslutning" + err) : console.log("Ansluten till databasen...");
});

// Routing
app.get("/", async (req, res) => {
    client.query("SELECT * FROM courses ORDER BY id DESC", (err, result) => {
        if (err) console.log("Fel vid db-fråga");
        else {
            res.render("index", { courses: result.rows });
        }
    });
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Add course
app.post("/add", async (req, res) => {
    const course = {
        code: req.body.coursecode,
        name: req.body.coursename,
        syllabus: req.body.syllabus,
        progression: req.body.progression
    }

    const result = await client.query(`
        INSERT INTO courses (coursecode, coursename, syllabus, progression)
        VALUES($1, $2, $3, $4)
    `, [course.code, course.name, course.syllabus, course.progression]
    );

    res.redirect("/add");
});

// Delete course
app.get("/delete/:id", async (req, res) => {
    const id = req.params.id;

    const result = await client.query(`
        DELETE FROM courses WHERE id=$1
    `, [id]);

    res.redirect("/");
});

app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});