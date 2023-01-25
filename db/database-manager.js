const ProductModel = require("../models/product")
const TransactionModel = require("../models/transaction")
const dataEncryption = require("../utils/data-encryption")
const mongoose = require("mongoose")

class DatabaseManager {
    constructor(){
        this.databaseInitilized = false
        this.mongoInitilizer = require("./mongo-db")
    }

    initDatabase(){
        this.mongoInitilizer(()=>{
            this.databaseInitilized = true
        })
    }

    async insertProduct(product){
        return ProductModel.create({
            name: product.name,
            description: product.description,
            price: product.price,
            isAvailable: product.isAvailable,
            isOnDiscount: product.isOnDiscount,
            discountPrice: product.discountPrice,
            photos: product.photos,
            rating: 0,
            categories: product.categories,
            tags: product.tags,
            timesRated: 0
        })
    }

    async rateProduct(rating, productId){
        let product = await ProductModel.findById(productId)

        if(!product)
            return false

        product.timesRated = product.timesRated + 1
        product.rating = (product.rating + rating) / product.timesRated

        product.save()
        return true
    }

    async getAllProducts(pageNum){
        return await ProductModel.paginate({}, {page: pageNum, limit: 10})
    }

    async getProductById(productId){
        return ProductModel.findById(productId)
    }

    async getProductsByCategory(category, pageNum){
        return await ProductModel.paginate({categories: category}, {page: pageNum, limit: 10})
    }

    async getProductsByTag(tag, pageNum){
        return await ProductModel.paginate({tags: tag}, {page: pageNum, limit: 10})

    }

    async deleteProductById(productId){
        return ProductModel.findByIdAndDelete({_id: productId})
    }

    async insertTransaction(transaction){
        return TransactionModel.create({
            userId: transaction.userId,
            username: transaction.userName,
            userSurname: transaction.userSurname,
            address: transaction.address,
            contactEmail: transaction.contactEmail,
            contactPhone: transaction.contactPhone,
            typeOfPayment: transaction.typeOfPayment,
            typeOfDelivery: transaction.typeOfDelivery,
            products: transaction.products,
            overallPrice: transaction.overallPrice,
            dateRecieved: transaction.dateRecieved,
            additionalData: transaction.additionalData
        })
    }

    async getAllTransactions(){
        return TransactionModel.find({})
    }

    async getTags(keyword){
        let products = await ProductModel.find({})
        let result = []

        for(let product of products){
            for(let tag of product.tags){
                if(tag.includes(keyword) && !result.includes(tag)){
                    result.push(tag)
                }
            }
        }

        return result
    }

    async getDiscountProducts(){
        return ProductModel.find({isOnDiscount: true})
    }
}

const databaseManager = new DatabaseManager()

module.exports = databaseManager