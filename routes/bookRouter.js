const express = require('express')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator()
const booksController = require('../controllers/booksController')

const bodySchema = Joi.object({
  title: Joi.string().min(2).max(15).required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  read: Joi.boolean().required()
})

const routes = (Book) => {
  const bookRouter = express.Router()

  const controller = booksController(Book)
  bookRouter.route('/books')
    .post(validator.body(bodySchema), controller.postBook)

    .get(controller.getBooks)

  bookRouter.route('/books/:bookId')
    .get(controller.getBooksById)

    .put(controller.updateBook)

    .delete(controller.deleteBook)

  return bookRouter
}

module.exports = routes
