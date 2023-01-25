let express = require("express")
let port = process.env.PORT || "3000"
let databaseManager = require("./db/database-manager")
let path = require("path")
const productRouter = require("./routers/productRouter")
const transactionRouter = require("./routers/transactionRouter")
const emailService = require("./utils/email-service")

let app = express()
let cors = require("cors")

app.use(cors({origin: "*", methods: ["POST", "GET"]}))
app.use(express.json())

databaseManager.initDatabase()
emailService.init("gmail", "betestbetest29@gmail.com", "osjfatphhhywqcdn")

app.use("/products", productRouter)
app.use("/transactions", transactionRouter)

app.use("/site", express.static(path.join(__dirname, "public")))

app.listen(port, ()=>{
    console.log("Express listening at port: " + port)
})