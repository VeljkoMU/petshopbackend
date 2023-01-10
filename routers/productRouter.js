const express = require("express")
const databaseManager = require("../db/database-manager")
const validateToken = require("../middleware/validate-token")
const ProductModel = require("../models/product")

const productRouter = express.Router()

productRouter.get("/category", async (req, res)=>{
    if(!req.query.category){
        res.status(400).end()
        return
    }

    let products = await databaseManager.getProductsByCategory(req.query.category, req.query.page)

    if(!products){
        res.status(500).end()
        return
    }

    products = {
        docs: products.docs,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage
    }

    res.json(products).status(200).end()
})

productRouter.get("/tag", async (req, res)=>{
    if(!req.query.tag){
        res.status(400).end()
        return
    }
   
    let products = await databaseManager.getProductsByTag(req.query.tag, req.query.page)

    if(!products){
        res.status(500).end()
        return
    }

    products = {
        docs: products.docs,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage
    }

    res.json(products).status(200).end()
})

productRouter.get("/all", async (req, res)=>{
    let products = await databaseManager.getAllProducts(req.query.page)

    if(!products){
        res.status(500).end()
        return
    }

    res.json(products).status(200).end()    
})

productRouter.get("/autoComplete", (req, res) => {
    let keyword = req.query.keyword
    if(!keyword){
        res.status(400).end()
        return
    }

    databaseManager.getTags(keyword)
    .then(results => {
        res.json(results).status(200).end()
    })
    .catch(err => {
        console.log(err)
        res.status(500).end()
    })
})


module.exports = productRouter