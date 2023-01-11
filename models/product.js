const mongoose = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2')

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    isAvailable: Boolean,
    isOnDiscount: {type: Boolean, required: false, default: false},
    discountPrice: {type: String, required: false, default: null},
    photos: [String],
    categories: [String],
    tags: [String]
})

ProductSchema.plugin(mongoosePaginate)

const ProductModel = new mongoose.model("ProductModel", ProductSchema)

module.exports = ProductModel