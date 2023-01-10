const AES= require("crypto-js/aes")
const crypto = require("crypto-js")

const KEY = "MY_KEY"

const encrypt = function(data) {
    let result = AES.encrypt(data, KEY).toString()
    result = crypto.enc.Base64.parse(result).toString(crypto.enc.Hex)
    return result
}

const decrypt = function(data) {
    let result = crypto.enc.Hex.parse(data).toString(crypto.enc.Base64)
    result = AES.decrypt(result, KEY).toString(crypto.enc.Utf8)
    return result
}

module.exports = {
    encrypt,
    decrypt
}