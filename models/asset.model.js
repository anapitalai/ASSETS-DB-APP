const mongoose = require('mongoose')
const Brands = require("../models/brand.model");
const Donors = require("../models/donor.model");
const Users = require("../models/user.model");
const Suppliers = require("../models/supplier.model");
const Categories = require("../models/category.model");
const Staff = require("../models/staff.model");
const Students = require("../models/student.model");

const { Schema } = mongoose

const AssetSchema = new Schema({
  assetName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  purchaseDate: {
    type: Date,
    required: false,
  },
  economicLife: {
    type: Number,
    required: false,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required:false,
  },
  image: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  model: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
  },
}, { timestamps: true })

const Assets = mongoose.model('Asset', AssetSchema)

module.exports = Assets
