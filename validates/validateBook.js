const validateBook = (req, res, next) => {
  const { name, genre } = req.body
  if (!name || !genre) {
    res.status(400).json('missing parameter')
  }
  next()
}
module.exports = validateBook