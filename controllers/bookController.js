const AuthorModel = require("../models/AuthorSchema")
const BookModel = require("../models/BookSchema")

const bookController = {
  // get a book
  getABook: async (req, res) => {
    try {
      const findBook = await BookModel.findById(req.params.id).populate('author')
      if (findBook) {
        res.status(200).json(findBook)
      } else {
        res.status(404).json("book not found")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // get list books
  getListBooks: async (req, res) => {
    try {
      const listBooks = await BookModel.find()
      res.status(200).json(listBooks)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // create book
  createBook: async (req, res) => {
    const { title, genre, author, publicDate } = req.body
    try {
      const newBook = new BookModel(req.body)
      const bookSaved = await newBook.save()
      if (author) {
        const findAuthor = await AuthorModel.findById(author)
        if (findAuthor) {
          await findAuthor.updateOne({ $push: { books: bookSaved._id } })
        }
      }
      res.status(200).json(bookSaved)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // update a book
  updateBook: async (req, res) => {
    try {
      const findBook = BookModel.findById(req.params.id)
      if (findBook) {
        await findBook.updateOne({ $set: req.body })
        res.status(200).json('update success')
      } else {
        res.status(404).json('not found book')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // delete book
  deleteBook: async (req, res) => {
    try {
      await BookModel.findByIdAndDelete(req.params.id)
      await AuthorModel.updateMany({ books: req.params.id }, { $pull: { books: req.params.id } })
      res.status(200).json('deleted successfully')
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = bookController