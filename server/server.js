import express from 'express';
import bodyParser from 'body-parser';
const db = require('./books.js')();
// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos

app.get('/api/v1/books', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'books retrieved successfully',
    books: db.getBook(),
  })
});

app.get('/api/v1/books/:id', (req, res) => {
  const id = req.params.id;
  const book = db.getBook(id);

  if (book) {
    return res.status(200).send({
      success: 'true',
      message: 'todo retrieved successfully',
      book,
    });
  }
  return res.status(404).send({
    success: 'false',
    message: 'todo does not exist',
  });
});

app.delete('/api/v1/books/:id', (req, res) => {
  const id = req.params.id;
  const index = db.deleteBook(id);
  if (index > -1) {
    return res.status(200).send({
      success: 'true',
      message: 'book deleted successfully',
    });
  }
  return res.status(404).send({
    success: 'false',
    message: 'book not found',
  });
});

app.put('/api/v1/books/:id', (req, res) => {
  const id = req.params.id;
  const book = db.getBook(id);

  if (!book) {
    return res.status(404).send({
      success: 'false',
      message: 'book not found',
    });
  }
  db.updateBook(id, req.body.book);
  return res.status(200).send({
    success: 'true',
    message: 'book updated successfully',
  });
});

app.post('/api/v1/books', (req, res) => {
  db.createBook(req.body.book);
  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    books: db.getBook(),
  })
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});