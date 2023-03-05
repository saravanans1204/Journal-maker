const express=require('express');

const lo=require('lodash');
const app=express();
const PORT=process.env.PORT || 9000
const {createInstance}=require('./db/connect.js');
const {createEntry}=require('./db/connect.js')

// express functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design 
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',(__dirname+'/views'));

let store=undefined;
const Db=createInstance('user1')
const addEntries=async ()=>{
    const initalEntry=await Db.find().exec()
    store=initalEntry
    // console.log(store)

}

addEntries()


// routers
app.get('/',(req,res)=>{
    res.render('home',{content:store})
    
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
    createEntry(post.title,post.content,Db)
    store.push(post)
    
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