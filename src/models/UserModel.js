const crypto = require("crypto");
const sqlite = require("sqlite3").verbose();
const bcrypt= require("bcrypt");
const { Result } = require("postcss");

const db = new sqlite3.Database("../../blogging_platform.db");

class UserModel {
  async registerUser(formData) {
    const { cPwd, ...userData } = formData;


    // * @desc generateSalt() function returns the salt for the password
    const salt = generateSalt();
    const passwordSalt=userData.password+salt;

    // * @desc write function to save to db
    let hashed=await bcrypt.hash(passwordSalt,10);
    // * @desc write function check whether or not the username already exists in the db.
    if (checkUsername(userData.username)){
        sql="INSERT INTO users(fullname,email) VALUES(?,?)";
        db.run(sql,[userData.fullname,userData.email],(err)=>{if (err) return console.log("couldnot insert data")});
        // sql="INSERT INTO userlogin(userl,email) VALUES(?,?)";
        
    }else{
        console.error("username is already taken");
    }
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
function checkUsername(searchString){
  sql="SELECT username FROM UserLogin"
  db.all(sql,(err,rows)=>{
      if (err){
          console.error("error in retriving username");
      }
      const usernames=rows.map(row=>row.username);
      if (usernames.indexOf(searchString) !== -1) {
          return true;
      } else {
          return false;
      }
  })
}
module.exports={UserModel}