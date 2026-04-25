const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {username: "Angel", password: "123"}
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  return users.some(user => user.username !== username)
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  return users.some(user => user.username===username && user.password===password)
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if(username && password) {
    if(authenticatedUser(username, password)) {
      const token = jwt.sign({"username":username}, "123456789", {expiresIn: '1hr'});
      req.session.authentication={token, username}
      res.status(300).send('User Logged In!')
    } else {
      res.status(300).send(`Error with Username/Password!`)
    }
  } else { 
      res.status(300).send('Username or Password not entered!')
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { review } = req.body;
  books[req.params.isbn].reviews[req.user.username] = review
  return res.status(300).json({message: 'Review has been added!'});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  delete books[req.params.isbn].reviews[req.user.username]
  return res.status(300).json({message:`Review for ${req.user.username} has been deleted!`});
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
