require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require("./src/routes");
const cors = require("cors")

app.use(cors({
  origin: '*'
}))

app.use((req, resp, next) => {
  resp.set({
    'Content-type': 'application/json'
  })
  next();
})

routes(app)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`App listening`)
})


/*const nodemailer = require("nodemailer");

const send = async ()=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "ricardo@sipione.tech", // generated ethereal user
          pass: "Sipione@0058", // generated ethereal password
        },
      });
      
      try{
        await transporter.sendMail({
            from: '"BORA BILLL 👻" <ricardo@sipione.tech>', // sender address
            to: "ricardosipe@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });

          console.log("enviado")
      }catch(err){
        console.log(err)
      }
      

}

send(*/