const express = require('express')
const bookController = require('../controllers/bookController')
const bookRouter = express.Router()
bookRouter.get('/:id', bookController.getABook)
bookRouter.get('/', bookController.getListBooks)
bookRouter.post('/', bookController.createBook)
bookRouter.put('/:id', bookController.updateBook)
bookRouter.delete('/:id', bookController.deleteBook)
module.exports = bookRouter