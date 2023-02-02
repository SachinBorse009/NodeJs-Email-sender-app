const express = require('express');
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

//body parser
app.use(bodyParser.urlencoded({extended:true}));

//set view engine
app.set('view engine' , 'ejs');
app.set('views', 'views');

//static middleware
app.use(express.static('css'))

//route
app.get('/', (req, res) => {
    res.render('mail')
})

//email-send route
app.post("/email-send", (req,res) => {
    const {name, email, message} = req.body;

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port:465,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from : process.env.EMAIL,
        to : email,
        subject : name,
        text : `My name is ${name}. ${message}`,
        html : `My name is ${name}. ${message}`,
    };

    transport.sendMail(mailOptions, (error, info) => {
        if(error) {
            return res.status(400).json({message: "Error"});
        }
        return res.status(200).json({message: "Email send successfully"});
    })
})



//server 
app.listen(process.env.PORT, () => {
    console.log('server in running on port: ' ,process.env.PORT)
})