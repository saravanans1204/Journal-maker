const mongoose=require('mongoose');
const mongoPassword=process.env.password;
const URI=`mongodb+srv://saran:${mongoPassword}@blog.g2cy5vt.mongodb.net/JournalUsers?retryWrites=true&w=majority`
const {createInstance,connection}=require('./connect.js');



const loginSchema=new mongoose.Schema({
    displayname:String,
    username:String,
    password:{
        type:String,
        required:true

    }
})


const connectionOne=mongoose.createConnection(URI)
const loginDb=createInstance(connectionOne,'users',loginSchema)


module.exports.loginDb=loginDb;