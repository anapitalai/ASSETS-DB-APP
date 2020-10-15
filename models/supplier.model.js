const mongoose = require('mongoose')

const { Schema } = mongoose

const SupplierSchema = new Schema({
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

const Suppliers = mongoose.model('Supplier', SupplierSchema)

module.exports = Suppliers