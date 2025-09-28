const express=  require('express');
const router = express.Router();
const wrapAsync = require('../utils/WrapAsync');

const multer = require('multer');
const upload = multer();

const {isloggedin, isOwner,validateListing}= require('../middleware');

//validateListing function
const listingController=require('../Controller/listing');

router.get('/', listingController.index);
 //actual editing in database //editing place
router.route('/:id/edit')
   .get(
    isloggedin,
    isOwner,
    wrapAsync(listingController.editListing))
    .put(isloggedin,
    isOwner,
     wrapAsync(listingController.updateListing));


//creating new Place 
// creating new place in database
router.route('/new')
   .get(isloggedin,
    wrapAsync(listingController.renderNewForm))
   .post(isloggedin,
    upload.none(), validateListing,wrapAsync(listingController.createListing));





//show listing
router.get('/:id',wrapAsync( listingController.showListing));



router.delete('/:id/delete',isloggedin,
    isOwner,
     wrapAsync(listingController.destroyListing))

module.exports = router;