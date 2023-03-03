const express=require('express');
const lo=require('lodash');
const app=express();
const PORT=process.env.PORT || 9000
const {Entry}=require('./db/connect.js')

// express functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design 
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',(__dirname+'/views'));

const store=[]

const initial=async ()=>{
    const initalEntry=await Entry.find().exec()
    store.push(initalEntry)
    console.log(store)

}

initial()


// routers
app.get('/',(req,res)=>{
    res.render('home',{page:"Home",content:store})
    
})

app.get('/about',(req,res)=>{
    res.render('about',{page:"About",content:aboutContent})
})


app.get('/contacts',(req,res)=>{
    res.render('contact',{page:"contact",content:contactContent})
})

app.get('/compose',(req,res)=>{
    res.render('compose',{page:"contact",content:contactContent})
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
    store.push(post)
    res.redirect('/')
})


app.post('/:id',(req,res)=>{
    const {id} = req.params

    const deleteStore=store.findIndex(post=>post.title==id)

    store.splice(deleteStore,1)

    res.redirect('/')


})



app.listen(PORT,()=>{
    console.log(`The app start on http://localhost:${PORT}`);
});