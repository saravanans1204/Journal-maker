const express=require('express');
const lo=require('lodash');
const app=express();
const PORT=process.env.PORT || 9000

// express functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// design 
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',(__dirname+'/views'));

const store=[{
    title:"Marcus Aurelius",
    content: `You have power over your mind  not outside events. Realize this, and you will find strength`
}]


const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
function click(e){
    console.log('hello')
}
 


// routers
app.get('/',(req,res)=>{
    res.render('home',{page:"Home",content:store,click:click})
    
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