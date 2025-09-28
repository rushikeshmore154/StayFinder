const express = require('express');
const app = express();
const session = require('express-session');
const flash= require('connect-flash');
const PORT = 3000;
const path=require('path');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));


const sessionOption={
    secret:"mysuperSecret",
    resave:false, 
    saveUninitialized:true
}
//middleware to use express-session
app.use(session(sessionOption));
app.use(flash());

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/test', (req , res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`your count is ${req.session.count}`);
})


//storing and using session
app.get('/register', (req, res) => {
    let { name = 'anonymous' } = req.query;
    req.session.name = name;
    req.flash("success", "user register successfully");
    res.redirect('/hello');
    
});
app.get('/hello',(req,res)=>{
    res.render('page', { name: req.session.name, msg: req.flash("success") });

})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});