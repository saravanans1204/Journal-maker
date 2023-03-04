
"use strict"
require('dotenv').config();
const URI=process.env.URI



const mongoose=require('mongoose');
const entrySchema=new mongoose.Schema({
    title:String,
    content:{
        type:String,
        required:true

    }
})
const  Entry=mongoose.model('Entry',entrySchema)


const connection= async ()=>{
    try{
        await mongoose.connect(URI)


    }catch(err){
        console.log(err)
    }
}

const createEntry=async (title="Marcus Aurelius",content=`You have power over your mind  not outside events. Realize this, and you will find strength`)=>{
    

        return Entry.create({
            title:title,
            content: content
        })
    }



function deleteSingle(query){
    try{
        connection()
        Entry.deleteOne(query).exec()
    }catch(err){
        console.log(err)
    }

}

connection()



module.exports.Entry=Entry;
module.exports.createEntry=createEntry;


