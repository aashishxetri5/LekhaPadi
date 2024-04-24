const crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose();
const bcrypt= require("bcrypt");
const { Result } = require("postcss");


const db = new sqlite3.Database('../../blogging_platform.db', (err) => {
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

async function UserModel(formData) {
  const { cPwd, ...userData } = formData;
  
  // * @desc generateSalt() function returns the salt for the password
  const salt = generateSalt();
  const passwordSalt=userData.password+salt;
  // * @desc write function to save to db
  let hashed=await bcrypt.hash(passwordSalt,10);
  // * @desc write function check whether or not the username already exists in the db.
  if (true){
      sql="INSERT INTO Users(fullname,email) VALUES(?,?)";
      db.run(sql, [userData.fullname, userData.email], (err) => {
        if (err) {
          console.error("Error occurred while running the SQL query:", err);
          return;
        }
        // Code to execute if there's no error
      });
      
      // sql="INSERT INTO userlogin(userl,email) VALUES(?,?)";
      
  }else{
      console.error("username is already taken");
  }
}


// Generates a 16 character long salt.
function generateSalt(length = 16) {
  console.log(length);
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
function checkUsername(searchString) {
  
  return new Promise((resolve, reject) => {
    const sql = "SELECT username FROM UserLogin";
    db.all(sql, (err, rows) => {
      if (err) {
        console.error("Error retrieving usernames:", err);
        reject(err);
        return;
      }

      const usernames = rows.map(row => row.username);
      if (usernames.indexOf(searchString) !== -1) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

module.exports={UserModel}