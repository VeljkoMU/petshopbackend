const mongoose = require("mongoose")

let connectionString = process.env.MONGO_DB_CONNESTION_STRING || "mongodb+srv://bestest123:afFDq4k9FlwdMPPK@cluster0.6y0uqul.mongodb.net/generictest?retryWrites=true&w=majority"

let initMongoConnection = function(initCallback){
mongoose.connect(connectionString, ()=>{
    console.log("MongoDB database connected to successfuly.")
    initCallback()
})
}

module.exports = initMongoConnection