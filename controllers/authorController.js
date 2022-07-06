const AuthorModel = require("../models/AuthorSchema")
const BookModel = require("../models/BookSchema")

const authorController = {
  // get a author
  getAAuthor: async (req, res) => {
    try {
      const findAuthor = await AuthorModel.findById(req.params.id).populate("books")
      if (findAuthor) {
        res.status(200).json(findAuthor)
      } else {
        res.status(404).json('author not found')
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
  ,
  // get List Author
  getListAuthor: async (req, res) => {
    try {
      const listAuthor = await AuthorModel.find()
      res.status(200).json(listAuthor)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  // create Author
  createAuthor: async (req, res) => {
    const { name, age } = req.body
    try {
      const newAuthor = new AuthorModel({ name, age })
      const authorSaved = await newAuthor.save()
      res.status(200).json(authorSaved)
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  // update a author
  updateAuthor: async (req, res) => {
    try {
      const findAuthor = await AuthorModel.findById(req.params.id)
      if (findAuthor) {
        await findAuthor.updateOne({ $set: req.body })
        res.status(200).json('update author success')
      } else {
        res.status(404).json('author not found')
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  },
  // delete author
  deleteAuthor: async (req, res) => {
    try {
      await AuthorModel.findByIdAndDelete(req.params.id)
      await BookModel.updateMany({ author: req.params.id }, { $set: { author: null } })
      res.status(200).json('deleted author success')
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

module.exports = authorController