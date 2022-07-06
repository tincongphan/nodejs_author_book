const mongoose = require("mongoose")
const { Schema } = mongoose
const bookSchema = new Schema({
  title: { type: String, required: true },
  publicDate: { type: String },
  genre: { type: [String] },
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
})
const BookModel = mongoose.model("Book", bookSchema)
module.exports = BookModel