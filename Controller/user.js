
const User= require('../models/User');

module.exports.renderSignupForm=(_req, res) => {
    res.render('User/user.ejs');
}

module.exports.signup=async (req, res) => {
    try{

        const { username, email, password } = req.body.user;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
         
            req.flash('success', 'User registered successfully');
            res.redirect('/listings');
        })
    } catch (err) {
        req.flash('error', "something went wrong");
        res.redirect('/signUp');
    }
}

module.exports.renderLoginForm=(req, res)=>{
    res.render('User/login.ejs');
}

module.exports.login=async (req, res) => {
        req.flash("success", "welcome to wanderLust");
        let redirect=res.locals.redirectUrl || '/listings';
        res.redirect(redirect);
    }

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","loggeed you out");
        res.redirect("/listings");
    })
}