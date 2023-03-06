const mongoose=require('mongoose');
const mongoPassword=process.env.password;
const URI=`mongodb+srv://saran:${mongoPassword}@blog.g2cy5vt.mongodb.net/JournalUsers?retryWrites=true&w=majority`
const {createInstance,connection}=require('./connect.js');



const loginSchema=new mongoose.Schema({
    username:String,
    password:{
        type:String,
        required:true

    }
})


connection(URI)
const loginDb=createInstance(URI,loginSchema)


module.exports.loginDb=loginDb;