const express=require("express");
const { updateOfferStatus, checkGotOffer, avgPackage, maxPackage, totalOffer, getUserOffers, getAllPlacedStudents } = require("../controller/offerController");
const offerRouter=new express.Router();
offerRouter.get("/",avgPackage);
offerRouter.route("/highest").get(maxPackage);
offerRouter.route("/total").get(totalOffer);
offerRouter.route("/all").get(getAllPlacedStudents);
offerRouter.route("/:user_id").patch(updateOfferStatus).get(getUserOffers);
offerRouter.route("/:user_id/check/:job_id").get(checkGotOffer);
module.exports.offerRouter=offerRouter;