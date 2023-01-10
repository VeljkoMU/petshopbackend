const mongoose = require("mongoose")
const ProductModel = require("./product")

const TransactionSchema = new mongoose.Schema({
    userName: String,
    userSurname: String,
    address: String,
    contactEmail: String,
    contactPhone: String,
    typeOfDelivery: String,
    products: [{
        productId: String,
        productName: String,
        price: Number
    }],
    overallPrice: Number,
    dateReceived: {type: String, index: true},
    additionalData: String
})

const TransactionModel = new mongoose.model("TransactionModel", TransactionSchema)

module.exports = TransactionModel