const express=  require('express');
const router = express.Router({mergeParams:true});


const wrapAsync = require('../utils/WrapAsync');


const {validateReview, isloggedin}= require('../middleware');

const reviewController = new require('../Controller/review');



//validate review;

router.post('/rating', 
    isloggedin,
    validateReview ,wrapAsync(reviewController.createReview));

router.delete('/Listings/:reviewid' ,
    isloggedin,
    wrapAsync(reviewController.destroyReview));

module.exports=router;