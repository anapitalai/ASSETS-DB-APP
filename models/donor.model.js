 const mongoose = require('mongoose')

const { Schema } = mongoose

const DonorSchema = new Schema({
    name: String,
    types: { type: String, enum: ["black", "white", "red"], required: true },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
})

const Donors = mongoose.model('Donor', DonorSchema)

module.exports = Donors