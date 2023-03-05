
"use strict"
require('dotenv').config();
const URI=String(process.env.URI)


const mongoose=require('mongoose');
const entrySchema=new mongoose.Schema({
    title:String,
    content:{
        type:String,
        required:true

    }
})


const createInstance=(users)=>{
    const  Entry=mongoose.model(users,entrySchema)
    return Entry
}



const connection= async ()=>{
    try{
        await mongoose.connect(URI)


    }catch(err){
        console.log(err)
    }
}

const createEntry=async (title="Marcus Aurelius",content=`You have power over your mind  not outside events. Realize this, and you will find strength`,entry)=>{
    

        return entry.create({
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



module.exports.createInstance=createInstance;
module.exports.createEntry=createEntry;


