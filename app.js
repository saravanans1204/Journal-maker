require('dotenv').config();


const express=require('express');
const md5 = require('md5');
const mongoose=require('mongoose')
const mongoPassword=process.env.password;
const lo=require('lodash');
const app=express();
const PORT=process.env.PORT || 9000
const {createInstance,connection}=require('./db/connect.js');
const {createEntry}=require('./db/connect.js');
const { loginDb } = require('./db/userDb.js');
const e = require('express');

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
let connectionTwo;
let store=[{title:'Marcus Aurelius',content:'You have power over your mind not outside events. Realize this, and you will find strength'}];


const addEntries=async (Db)=>{
    const initalEntry=await Db.find().exec()
    store=initalEntry
    // console.log(store)

}
connectionTwo=mongoose.createConnection(entryUri)




// routers
app.get('/',async (req,res)=>{
    if(isLogin===false){
    
        const data =createInstance(connectionTwo,'common')
        await addEntries(data)
        res.render('home',{content:store,isLogin:isLogin,loginDetails:loginDetails})
        
        
    }else{
        
        dataDb=createInstance(connectionTwo,String(loginDetails.username))
        await addEntries(dataDb)
        res.render('home',{content:store,isLogin:isLogin,loginDetails:loginDetails})
        
        
        // dataDb.find({}).then((reslove,reject)=>{
        //     if(reslove!==null ||[]){
        //         console.log()
        //         store.push(reslove)
        //     }
        // })
    }
    
    

})

// app.get('/contacts',(req,res)=>{
   
//     res.render('contact')
// })

app.get('/compose',(req,res)=>{
    res.render('compose',{content:store,isLogin:isLogin,loginDetails:loginDetails})
})

app.get('/about',(req,res)=>{
     res.render('about',{content:store,isLogin:isLogin,loginDetails:loginDetails})
})


app.get('/login',(req,res)=>{
    res.render('login',{content:store,isLogin:isLogin,loginDetails:loginDetails})
})

app.get('/signup',(req,res)=>{
    res.render('signup',{content:store,isLogin:isLogin,loginDetails:loginDetails})
})

app.get('/logout',(req,res)=>{
    isLogin=false;
    res.redirect('/')
})


app.get('/:id',(req,res)=>{
    const id=req.params.id

    store.forEach((e)=>{
       if(lo.lowerCase(e.title)===lo.lowerCase(id)){
        res.render('expandpage',{title:e.title,content:e.content,loginDetails:loginDetails,isLogin:isLogin})
    
    }
    })
    
    
})

// post 
app.post('/compose',(req,res)=>{
    let post={
        title:req.body.title,
        content:req.body.entry
    }
    dataDb=createInstance(connectionTwo,String(loginDetails.username))
    createEntry(dataDb,post.title,post.content)
    store.push(post)
    
    res.redirect('/')
})

app.post('/login',(req,res)=>{
   
    
    loginDetails={  username: req.body.username, password: md5(req.body.password) }  
    console.log(loginDetails)
    loginDb.findOne(loginDetails).then((resolve,reject)=>{
        // console.log(resolve)
        if(resolve!==null){
            loginDetails=resolve
            isLogin=true
            res.redirect('/')
        }else{
            res.render('extras/register',{content:store,isLogin:isLogin,loginDetails:loginDetails})
        }
    })
   
})



app.post('/signup',(req,res)=>{
   
    
   const  signUpDetails={ displayname: req.body.displayname, username: req.body.username, password: md5(req.body.password) }  
   loginDb.findOne({username:signUpDetails.username}).then((resolve,reject)=>{
    // console.log(resolve)
        if(resolve===null){
            loginDb.create(signUpDetails)
            console.log(signUpDetails)
            res.redirect('/login')
        }else{
            res.render('extras/userexist',{content:store,isLogin:isLogin,loginDetails:loginDetails})
        }
   })
   
    
})


app.post('/:id',(req,res)=>{
    const {id} = req.params

    const deleteStore=store.findIndex(post=>post.title==id)
    dataDb.deleteOne({title:id}).exec()

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