const nodemailer = require("nodemailer")


class EmailService{
    constructor(){
        this.provider = ""
        this.senderEmail = ""
        this.senderAuth = ""
        this.transporter = undefined
    }

    init(provider, sender, auth){
        this.provider = provider
        this.senderEmail = sender
        this.senderAuth = auth
        const options = {
            service: provider,
            auth: {
                user: sender,
                pass: auth
            }
        }

        this.transporter = nodemailer.createTransport(options)
    }

    send(receiever, header, msg){
        if(!this.transporter)
            return undefined

        return this.transporter.sendMail({
            from: this.senderEmail,
            to: receiever,
            subject: header,
            text: msg
        })
    }
}

const emailService = new EmailService()

module.exports = emailService