const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/books/add', (req, res, next) => {
    res.render('book-add');
});

router.get('/books', (req, res, next) => {
    res.render('books');
});

router.get('/books/edit', (req, res, next) => {
    res.render('book-edit');
});

router.get('/books', (req, res, next) => {
  Book.find()
    .then(allTheBooksFromDB => {
      // console.log('Retrieved books from DB:', allTheBooksFromDB);
      res.render('books', { books: allTheBooksFromDB });
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
    })
});

router.post('/books/add', (req, res, next) => {
    const { title, author, description, rating } = req.body;
    const newBook = new Book({ title, author, description, rating });
    newBook
        .save()
        .then((book) => {
            res.redirect('/books');
        })
        .catch((error) => {
            console.log(error);
        });
});


module.exports = router;
