const Listing=require('../models/Listing');
const Review=require('../models/Review');

module.exports.createReview=async (req,res)=>{
    let listing_id=req.params.id;
    let reviewdata=req.body.rating;
    console.log(listing_id);
    console.log(reviewdata);
    const newReview=  new Review(reviewdata);
    newReview.author = req.user._id;
    await newReview.save().then(()=>{
        console.log(" review save in db")
    });
    const listing=await Listing.findById(listing_id);
    await listing.reviews.push(newReview);
    await listing.save();   
    req.flash("success","New review was created");
    res.redirect(`/Listings/${listing_id}`);

}

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewid}=req.params;
    
    const listing=await Listing.findByIdAndUpdate(id,{$pull:{'reviews':reviewid}});
    const deleted_review=await Review.findByIdAndDelete(reviewid);
    listing.save();
    console.log(deleted_review);    
    console.log(listing);    
    req.flash("success","review was deleted");
    res.redirect(`/Listings/${id}`);

}