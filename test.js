const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Specify the path to your SQLite database file
const dbPath = './blogging_platform.db';

// Create a new Database object
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Query to select the names of all tables
    const sql = "SELECT name FROM sqlite_master WHERE type='table'";

    // Execute the query to get table names
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error selecting table names:', err.message);
      } else {
        // Extract table names from the query result
        const tableNames = rows.map(row => row.name);
        console.log('Table names:', tableNames);
      }
    });
  }
});

// Close the database connection when done
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
