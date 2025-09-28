const Listing= require('./models/Listing');
const express = require('express');
const wrapAsync = require('./utils/wrapAsync'); // adjust path if needed

// Export the testListing route as a function
const testrouter = express.Router();

//create sample data:
testrouter.get('/testListing', wrapAsync(async (req, res) => {
    let Place1 = new Listing({
        title: "Sahyadri",
        description: "The Sahyadri Range, also known as the Western Ghats, is a mountain range in western India, stretching from Gujarat to Tamil Nadu. It is a UNESCO World Heritage Site known for its diverse ecosystems, including dense forests, grasslands, and waterfalls. The range is also home to numerous forts, historical sites, and hill stations. ",
        price: 5000000,
        location: "raygad",
        country: "india"
    });

    await Place1.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
    console.log("sample created");
    res.send("sample was created");
}));

module.exports = testrouter;