
"use strict"

const URI=`mongodb+srv://saran:1111@blog.g2cy5vt.mongodb.net/?retryWrites=true&w=majority`
let firstEntry=undefined;

const { query } = require('express');
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
        if(err){
            console.log(err)
        }else{
            console.log(`success`)
        }
        
    }
}

const createEntry=async (title="Marcus Aurelius",content=`You have power over your mind  not outside events. Realize this, and you will find strength`)=>{
    return Entry.create({
    title:title,
    content: content
})




}

const main=async ()=>{
    connection()
    firstEntry= await createEntry()
}

function deleteSingle(query){
    try{
        connection()
        Entry.deleteOne(query).exec()
    }catch(err){
        console.log(err)
    }

}

// main()
connection()

module.exports.Entry=Entry;


