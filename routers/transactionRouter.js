const express = require("express")
const databaseManager = require("../db/database-manager")
const validateToken = require("../middleware/validate-token")
const validateTransaction = require("../middleware/validate-transaction")
const TransactionModel = require("../models/transaction")
const generateCurrentDateTimeString = require("../utils/generate-current-datetime")

const transactionRouter = express.Router()
const emailService = require("../utils/email-service")
const EthereumTransationManager = require("../utils/ethereum-transaction-manager")

transactionRouter.post("/buy", validateTransaction, (req, res)=>{
    let currentDateTime = generateCurrentDateTimeString()
    
    let transaction = {
        userName: dataEnryption.encrypt(req.body.userName),
        userSurname: dataEnryption.encrypt(req.body.userSurname),
        address: dataEnryption.encrypt(req.body.address),
        contactEmail: dataEnryption.encrypt(req.body.contactEmail),
        contactPhone: dataEnryption.encrypt(req.body.contactPhone),
        typeOfDelivery: req.body.typeOfDelivery,
        products: req.body.products,
        overallPrice: req.body.overallPrice,
        dateReceived: currentDateTime,
        additionalData: req.body.additionalData
    }

    databaseManager.insertTransaction(transaction)
    .then(()=>{
        emailService.send("", "TEST", "Test" + req.body.contactPhone)
        if(res.body.contactEmail != ""){
            emailService.send(res.body.contactEmail, "", "")
        }
        res.status(200).end()
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).end()
    })
})

transactionRouter.post("/contact", (req, res) => {
    let email = req.body.email
    let msg = req.body.msg

    if(!email || !msg){
        res.status(400).end()
        return
    }

    emailService.send(email, "KORISNICKA PORUKA - WEBSHOP", msg)
    .then(result => {
        res.status(200).end()
    })
    .catch(err => {
        console.log(err)
        res.status(500).end()
    })
})

module.exports = transactionRouter