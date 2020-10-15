const mongoose = require('mongoose')

const { Schema } = mongoose

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
})

const Categories = mongoose.model('Category', CategorySchema)

module.exports = Categories