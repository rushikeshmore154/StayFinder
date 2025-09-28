
const mongoose = require('mongoose');
const Review = require('./Review');
const schema = mongoose.Schema;
// You forgot this:



const ListingSchema = new schema({
  title: {
    type: String,
    required: true,
    default: "Untitled Listing" // Default value
  },
  description: String,
  image: {
    filename: { type: String },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      set: (x) =>
        x === ''
          ? "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
          : x,
    }
  },
  price: Number,
  location: String,
  country: String,
  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
  }],
  owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
  }
});

ListingSchema.post('findOneAndDelete', async (listing) => {
  // 'listing' here is the deleted document returned by findOneAndDelete
  if (listing && listing.reviews.length>0) {
    console.log("hi");
    console.log(listing);
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;

