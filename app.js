const express = require('express');
const Visitor = require("./src/visitor");
const cors = require("cors");
const bodyParser = require('body-parser');
"use strict";
const nodemailer = require("nodemailer");
const app = express();
const path = require('path');
app.use(express.static(`./dist/frontend`));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
/* 
app.get('/', (req, res) => {
  res.send('')
}) */
app.post('/api/create', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

  var visitor = {
    uname       : req.body.visitor.uname,
    frndname    : req.body.visitor.frndname,
    email       : req.body.visitor.email
    }

  let newvisitor = new Visitor(visitor);
  newvisitor.save()
      .then(visitor => {
          res.status(200).json({'visitorId': visitor._id});
      })
      .catch(err => {
          res.status(400).send('adding new visitor failed');
      });
})
app.get('/api/getVisitor/:id',(req, res) => {
        id  = req.params.id;
        Visitor.findById({"_id":id})
        .then(function (visitor) {
          res.send(visitor);
      })
      .catch(err => {
          res.status(400).send('fetching visitor failed');
      });

  }) 

  app.post('/api/sendEmail', function (req, res) {
    // async..await is not allowed in global scope, must use a wrapper
async function main() {
  
 var visitor = {
    uname       : req.body.visitor.uname,
    frndname    : req.body.visitor.frndname,
    email       : req.body.visitor.email,
    id : req.body.visitor._id
    }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",   
    auth: {
      user: 'wishgreeting2022@gmail.com',
      pass: 'mckfxowcmhxcjpcd'
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'wishgreeting2022@gmail.com', // sender address
    to: visitor.frndname+visitor.email, // list of receivers
    subject: "Happy 2022", // Subject line
    text: 'hi'+ visitor.frndname+' your friend '+  visitor.uname +' send you Happy 2022 wishes, check it 👉🏻👉🏻 ' + 'https://wish2022happy.herokuapp.com/greeting/' +visitor.id+''
  });
console.log(visitor);
  console.log("Message sent: %s", info.messageId);
  res.status(200).json({'message': 'Mail sent successfully'});
}

main().catch(console.error);
    
    });
app.get('/*', function(req, res) {

  res.sendFile(path.join(__dirname + '/dist/frontend/index.html'));
});
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server up in Port 5000 ");
});