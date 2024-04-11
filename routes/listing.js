const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//index route
router 
    .route("/")
    .get( wrapAsync(listingController.index))
    // .post( validateListing, wrapAsync(listingController.createListing));
    .post(isLoggedIn, upload.array('listing[image]'), validateListing, wrapAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//update route
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.array("listing[image]"),
        validateListing, 
        wrapAsync(listingController.upadeteListing)
    )
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

//edit route 
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditform));

module.exports = router;