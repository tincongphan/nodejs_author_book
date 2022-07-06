const AuthorModel = require("../models/AuthorSchema")

const validateAuthor = async (req, res, next) => {
  const { name, age } = req.body
  if (!name || !age) {
    res.status(400).json('missing parameter')
  } else {
    try {
      // find() return array
      const authors = await AuthorModel.find()
      for (let author of authors) {
        if (name === author.name) {
          return res.status(404).json("author existed")
        }
      }
      next()
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
module.exports = validateAuthor