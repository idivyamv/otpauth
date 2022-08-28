const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/GreetingApp');
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


const Schema = mongoose.Schema;
const Visitor = new Schema({
    uname    : String,
    frndname : String,
    email    : String   

})
const newVisitor = mongoose.model('visitor',Visitor);
module.exports = newVisitor;