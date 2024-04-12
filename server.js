const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
const port = process.env.port | 3000;

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});