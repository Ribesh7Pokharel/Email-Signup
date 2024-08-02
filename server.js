const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const https = require("https")
const { request } = require("http")
const nodemailer = require("nodemailer");




app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("Public"))
app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post ('/' , async(req, res)=>{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dewitt.crona@ethereal.email',
            pass: 'AsYpZHN97nQ7ejcYqF'
        }
})



try {
    const info = await transporter.sendMail({
        from: '"Dewitt Foo Koch 👻" <dewitt.crona@ethereal.email>', // sender address
        to: email, // receiver's email
        subject: "Thanks for subscribing ✔", // Subject line
        text: `Hello ${firstname} ${lastname} thanks for subscribing. We will keep you updated.`, // plain text body
        html: `<b>Hello ${firstname} ${lastname} thanks for subscribing. We will keep you updated.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.send("Email sent successfully!");
} catch (error) {
    console.error(error);
    res.send("Failed to send email.");
}
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});