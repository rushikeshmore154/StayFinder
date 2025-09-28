const Listing=require("./models/Listing");
const ExpressError=require('./utils/ExpressError');
const listingJoiSchema=require('./Schema');
// const ExpressError=require('./utils/ExpressError');
const reviewJoiSchema=require('./Schema');
// const Review=  require('./models/Review');


module.exports.isloggedin = (req, res, next) => {
    // console.log(req);
    // console.log(req.path);
    // console.log(req.originalUrl);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash('error', "You must have to Login first");
        return res.redirect('/login');
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        // console.log(req.session.redirectUrl);
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    if (!listing || !res.locals.currUser._id.equals(listing.owner._id)) {
        req.flash("error", "You dont have permision to edit");
        return res.redirect(`/Listings/${id}`);
    }
    next();
}

//validateListing function
module.exports.validateListing=(req,res,next) =>{
    let {err}=listingJoiSchema.validate(req.body);
    if(err){
        throw new ExpressError(400,'validation failed ${err}');
    }else{
        next()
    }
}

//validate review
module.exports.validateReview=(req,res,next)=>{
    let {err}=reviewJoiSchema.validate(req.body);
    if(err){
        throw new ExpressError(400,'validation failed for review ${err}')
    }else{
        next()
    }
}