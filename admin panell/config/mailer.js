const nodemailer = require("nodemailer");

const trasnsport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "rajmanavadariya2002@gmail.com",
        pass : "kryuyhcxqzunukso"
    }
})
module.exports.sendotp = (to,otp)=>{
    let mailoption ={
        from : "rajmanavadariya2002@gmail.com",
        to : to,
        subjet : "Your otp",
        text : `your otp is ${otp}`
    }
    trasnsport.sendMail(mailoption,(err)=>{
        err && console.log(err);
    })
}