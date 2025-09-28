const Listing = require("../models/Listing");



module.exports.index=async (req,res)=>{
    let allListings=await Listing.find({});
    // console.log("Listing is called");
    res.render("listings/index",{allListings});
}

module.exports.renderNewForm=(req, res)=>{
    res.render('listings/new');
    // console.log("place request is done");
}

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
    let upd_place=await Listing.findById(id);
    if(!upd_place){
        req.flash("error","Listing is not present");
        res.redirect('/Listings');
    }
    console.log(upd_place);
    res.render('listings/edit',{upd_place});
}

module.exports.updateListing=async(req,res)=>{
    let  u_place=req.body.places;
    let id=req.params.id;

    let updatedPlace = await Listing.findByIdAndUpdate(id, u_place, { new: true });
    console.log(updatedPlace);
      if(!updatedPlace){
        req.flash("error","Listing is not present");
        res.redirect('/Listings');
    }
    req.flash("success","Listing was updated");
    res.redirect(`/Listings/${id}`);
}

module.exports.showListing=async (req, res) => {
    const { id } = req.params;
    try {
        const place = await Listing.findById(id).populate({
            path:"reviews",
            populate:{path:'author'},
        })
        .populate("owner");
        // console.log(place);
        if(!place){
        req.flash("error","Listing is not present");
        res.redirect('/Listings');
    }
    
        console.log(place);
        res.render("listings/show", { place });
        // console.log("ok place can be view");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}

module.exports.createListing=async (req, res) => {
       
        let place= req.body.places;
        console.log(place);
        let newPlace=await new Listing(place);
        newPlace.owner=req.user._id;
         await newPlace.save().then((res)=>{
            console.log("save in db");
        })
        req.flash("success","New Listing was created");
        res.redirect('/Listings');
 
}

module.exports.destroyListing=async (req,res)=>{
    let id=req.params.id;
    let deletedPlace=await Listing.findByIdAndDelete(id);
    console.log(id);
    console.log(`this id deleted ${deletedPlace}`);
    req.flash("success"," Listing was deleted");
    res.redirect("/Listings");
}