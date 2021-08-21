let offerModel=require("../model/offerModel")
async function updateOfferStatus(req, res) {
    let { user_id } = req.params;
    //sq=>update
    try {
        const response = await offerModel.updateOfferStatusModel(user_id, req.body);
        res.status(200).json({
            sucess: "sucessful",
            user: response
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            user: err.message
        })
    }
}
async function checkGotOffer(req, res) {
    try {
        let { job_id ,user_id} = req.params;
        let status = await offerModel.checkIfGotOfferModel(user_id,job_id);
        res.status(200).json({
            status: "Result found",
            offer: status
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
async function avgPackage(req, res) {
    try {
        let response = await offerModel.avgPackageModel();
        res.status(200).json({
            status: "Result found",
            avg: response
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
async function maxPackage(req, res) {
    try {
        let response = await offerModel.maxPackageModel();
        res.status(200).json({
            status: "Result found",
            max: response
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

async function totalOffer(req, res) {
    try {
        let response = await offerModel.totalOfferModel();
        res.status(200).json({
            status: "Result found",
            count: response
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
async function getUserOffers(req, res) {
    try {
        let {user_id}=req.params
        let response = await offerModel.getuserOffersModel(user_id);
        res.status(200).json({
            status: "Result found",
            jobs: response
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
async function getAllPlacedStudents(req, res) {
    try {
        let response = await offerModel.getAllPlacedStudentsModel();
        res.status(200).json({
            status: "Result found",
            users: response
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
module.exports.getAllPlacedStudents=getAllPlacedStudents
module.exports.getUserOffers=getUserOffers
module.exports.updateOfferStatus=updateOfferStatus;
module.exports.checkGotOffer=checkGotOffer;
module.exports.avgPackage=avgPackage;
module.exports.maxPackage=maxPackage;
module.exports.totalOffer=totalOffer;