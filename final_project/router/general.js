const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios')

public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if(username && password) {
    if(isValid(username)) {
      users.push({"username":username, "password":password})
      res.status(200).send('User registered!')
    } else {
      res.status(500).send(`Username ${username} already exists!`)
    }
  } else { 
      res.status(500).send('Username or Password not entered!')
  }
});

// Task 1/10
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

public_users.get('/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/')
    return res.status(200).json(response.data);
  } catch {
    return res.status(500).json({message: "Error"})
  }
});


// Task 2/11
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]);
});

public_users.get('/isbn/:isbn/details', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`)
    return res.status(200).json(response.data)
  } catch {
    res.status(500).json({message: "Error"})
  }
})


// Task 3/12
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const ret_books = Object.values(books).filter(book => (
    book.author == req.params.author
  ))

  if (ret_books) {
      return res.status(200).send(ret_books);
  } else {
    return res.status(500).json({message: "Author not found!"})
  }
});

public_users.get('/author/:author/book', async (req, res) => {
  try {
      const response = await axios.get(`http://localhost:5000/author/${req.params.author}`)
      return res.status(200).json(response.data);
  } catch {
    return res.status(500).json({message: "Error"})
  }
});


// Task 4/13
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const ret_books = Object.values(books).filter(book => (
    book.title === req.params.title
  ))
  return res.status(200).send(ret_books);
});

public_users.get('/title/:title/book', async (req, res) => {
  try {
    const response = await axios(`http://localhost:5000/title/${req.params.title}`)
    return res.status(200).send(response.data);
  } catch {
    return req.status(500).json({message: "Error"})
  }
})


// Task 5
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const review_isbn = books[req.params.isbn].reviews
  return res.status(200).send(review_isbn);
});

module.exports.general = public_users;
