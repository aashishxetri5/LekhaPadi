const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
const port = 3000;

app.set("views", path.join(__dirname, "src", "views")); //Setting the path of views to src/views
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "src", "public"))); //For static files like CSS and client-side JS

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to sqlite DB
const db = new sqlite3.Database("./blogging_platform.db");

// Read the schema file
const schemaSql = fs.readFileSync("schema.sql", "utf8");

// Execute schema SQL to create tables
db.serialize(() => {
  db.exec(schemaSql, (err) => {
    if (err) {
      console.error("Error executing schema SQL:", err.message);
    } else {
      console.log("Tables created successfully.");
    }
  });
});

// Close the database connection when the app exits
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database connection:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit();
  });
});

const routes = require("./src/routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
