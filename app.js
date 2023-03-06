require('dotenv').config();


const express=require('express');
const mongoose=require('mongoose')
const mongoPassword=process.env.password;
const lo=require('lodash');
const app=express();
const PORT=process.env.PORT || 9000
const {createInstance,connection}=require('./db/connect.js');
const {createEntry}=require('./db/connect.js');
const { loginDb } = require('./db/userDb.js');

const entryUri=`mongodb+srv://saran:${mongoPassword}@blog.g2cy5vt.mongodb.net/JournalDb?retryWrites=true&w=majority`
// const {loginDb}=require("./db/userDb.js")
// express functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design 
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',(__dirname+'/views'));
let isLogin=false;
let dataDb
let loginDetails;
let store=undefined;


const addEntries=async (Db)=>{
    const initalEntry=await Db.find().exec()
    store=initalEntry
    // console.log(store)

}




// routers
app.get('/',(req,res)=>{
    mongoose.connect(entryUri)
    connection(entryUri)
    const data =createInstance('common')
    addEntries(data)
    res.render('home',{content:store,isLogin:isLogin})
    
})

// app.get('/contacts',(req,res)=>{
   
//     res.render('contact')
// })

app.get('/compose',(req,res)=>{
    res.render('compose')
})

app.get('/about',(req,res)=>{
     res.render('about')
})


app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})



app.get('/:id',(req,res)=>{
    const id=req.params.id

    store.forEach((e)=>{
       if(lo.lowerCase(e.title)===lo.lowerCase(id)){
        res.render('expandpage',{title:e.title,content:e.content})
    
    }
    })
    
    
})

// post 
app.post('/compose',(req,res)=>{
    let post={
        title:req.body.title,
        content:req.body.entry
    }
    createEntry(dataDb,post.title,post.content)
    store.push(post)
    
    res.redirect('/')
})

app.post('/login',(req,res)=>{
   
    
    loginDetails=req.body
    loginDb.find(loginDetails).then((res,rej)=>{
        console.log(res)
    })
    res.redirect('/')
})

app.post('/:id',(req,res)=>{
    const {id} = req.params

    const deleteStore=store.findIndex(post=>post.title==id)
    Db.deleteOne({title:id}).exec()

    store.splice(deleteStore,1)

    res.redirect('/')


})




app.get('*', function(req, res){
    if(res.status(404)){
       return res.render('error')
    }
  });

app.listen(PORT,()=>{
    console.log(`The app start on http://localhost:${PORT}`);
});