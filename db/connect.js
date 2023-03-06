
"use strict"



const mongoose=require('mongoose');

const entrySchema=new mongoose.Schema({
    title:String,
    content:{
        type:String,
        required:true

    }
})


const createInstance=(users,dbSchema=entrySchema)=>{
    const  Entry=mongoose.model(users,dbSchema)
    return Entry
}



const connection= async (uri)=>{
    try{
        mongoose.connect(uri)


    }catch(err){
        console.log(err)
    }
}

const createEntry=async (entry,title="Marcus Aurelius",content=`You have power over your mind  not outside events. Realize this, and you will find strength`)=>{
    

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





module.exports.connection=connection
module.exports.createInstance=createInstance;
module.exports.createEntry=createEntry;


