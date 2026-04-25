const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if(username && password) {
    if(isValid(username)) {
      res.status(300).send('User registered!')
    } else {
      res.status(300).send(`Username ${username} already exists!`)
    }
  } else { 
      res.status(300).send('Username or Password not entered!')
  }
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   return res.status(300).send(JSON.stringify(books));
// });

public_users.get('/',async function (req, res) {
  const books_data = await fetch(books);
  

})

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).send(JSON.stringify(books[req.params.isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const ret_books = Object.values(books).filter(book => (
    book.author == req.params.author
  ))
  return res.status(300).send(ret_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const ret_books = Object.values(books).filter(book => (
    book.title === req.params.title
  ))
  return res.status(300).send(ret_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review_isbn = books[req.params.isbn].reviews
  return res.status(300).send(review_isbn);
});

module.exports.general = public_users;
