const express = require("express")
const databaseManager = require("../db/database-manager")
const validateTransaction = require("../utils/validate-transaction")
const TransactionModel = require("../models/transaction")
const generateCurrentDateTimeString = require("../utils/generate-current-datetime")

const transactionRouter = express.Router()
const emailService = require("../utils/email-service")
const dataEncryption = require("../utils/data-encryption")

transactionRouter.post("/buy", validateTransaction, (req, res)=>{
    let currentDateTime = generateCurrentDateTimeString()
    
    let transaction = {
        userName: dataEncryption.encrypt(req.body.userName),
        userSurname: dataEncryption.encrypt(req.body.userSurname),
        address: dataEncryption.encrypt(req.body.address),
        contactEmail: dataEncryption.encrypt(req.body.contactEmail),
        contactPhone: dataEncryption.encrypt(req.body.contactPhone),
        typeOfDelivery: req.body.typeOfDelivery,
        products: req.body.products,
        overallPrice: req.body.overallPrice,
        dateReceived: currentDateTime,
        additionalData: req.body.additionalData
    }

    databaseManager.insertTransaction(transaction)
    .then(()=>{
        emailService.send("veki.uskovic@gmail.com", "NOVA PRUDZBINA - WEBSHOP", formatInfoMsg(transaction, req.body))
        if(req.body.contactEmail != ""){
            emailService.send(req.body.contactEmail, "OBAVESTENJE O PRIMLJENOJ NARUDZBINI", formatConformationMsg(transaction))
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

    emailService.send("veki.uskovic@gmail.com", "KORISNICKA PORUKA - WEBSHOP", msg + "\n POSLAO:" + email)
    .then(result => {
        res.status(200).end()
    })
    .catch(err => {
        console.log(err)
        res.status(500).end()
    })
})

function formatInfoMsg(transaction, body) {
    let msg = "NOVA PORUDZBINA: \n" +
    `IME: ${body.userName}\n` +
    `PREZIME: ${body.userSurname}\n`+
    `ADRESA: ${body.address}\n`+
    `TEL: ${body.contactPhone}\n`+
    `EMAIL: ${body.contactEmail}\n`+
    `UKUPNO ZA NAPLATU: ${transaction.overallPrice}\n`+
    "PROIZVODI: \n"

    for(let product of transaction.products){
        msg += `${product.productName} \n`
    }

    if(transaction.additionalData != ""){
        msg += `DODATNA NAPOMENA KONRISNIKA: ${transaction.additionalData} \n`
    }

    return msg
}

function formatConformationMsg(transaction) {
    let msg = "Naurdzbina koju ste poslali je uspesno primljena! \n" +
    "Proizvodi koje ste naurcili: \n\n"

    for(let product of transaction.products){
        msg += `${product.productName} \n`
    }

    return msg
}

module.exports = transactionRouter