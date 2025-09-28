const express=  require('express');
const app=express();
const mongoose=  require('mongoose');
const path=require('path');
const methodoverride=require('method-override');
const ejsMate=require('ejs-mate');
const wrapAsync = require('./utils/WrapAsync');
const ExpressError=require('./utils/ExpressError');


const listingRouter = require('./routes/Listings');
const reviewRouter = require('./routes/review');
const userRouter=require('./routes/user');

const session= require('express-session');
const flash= require('connect-flash');
const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const User= require('./models/User');

const {isloggedin}= require('./middleware');

const port=8080;
const mongo_url='mongodb://127.0.0.1:27017/wander_lust'

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const sessionOption={
    secret:"mysecreate",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:new Date(Date.now()+3*24*60*60*1000),
        maxAge:3*24*60*60*1000,
        httpOnly:true,
    }
}
app.use(session(sessionOption));
app.use(flash());


//passport initlize,session,strategy and serialize,and deserialize
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then(()=>{
    console.log("mongodb connection is successfull");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_url);
}


app.get('/',wrapAsync((req,res)=>{
    res.send("this is Home Page");
}))

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    // console.log(res.locals.currUser);
    next();
})

app.get('/registerUser',async(req,res)=>{
    const fakeUser=new User({
        email:"suraj@gmail.com",
        username:"suraj"
    });
    let reg_User=await User.register(fakeUser,"123");
    res.send(reg_User);
})

app.use('/Listings',listingRouter);
app.use('/review/:id',reviewRouter);
app.use('/',userRouter);


app.use((req, res, next) => {
  const err = new ExpressError(404,'Page Not Found');
  next(err);
});
// console.log("eroor after");

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).send(message);
});

app.listen(port,()=>{
    console.log(`app is listening on port: http://localhost:${port}`);
})