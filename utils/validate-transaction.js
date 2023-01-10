const databaseManager = require("../db/database-manager")


const validateTransaction = function(req, res, next){
    console.log(1)
    if(!validateTransactionData(req.body) || !validateProducts(res.body)){
        res.status(400).end()
        return
    }

    next()
}

function validateTransactionData(body){
    console.log(2)
    if(!body.contactPhone
        || !body.typeOfDelivery
        || !body.overallPrice
        || !body.additionalData)
            return false
    else
        return true
}

async function validateProducts(body){
    console.log(3)
    if(!body.products || body.products.length === 0)
        return false
    
    for(let product of body.products){
        if(!product.productId || !product.productName || !product.price)
            return false
        
        let productInDb = await databaseManager.getProductById(product.productId)
        console.log(productInDb)
        if(!productInDb || !productInDb.isAvailable)
            return false
    }

    return true
}

module.exports = validateTransaction