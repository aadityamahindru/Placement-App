const userModel = require("../model/userModel");
async function createUser(req, res) {
    try {
        let newUser = await userModel.createUserModel(req.body);
        res.status(201).json({
            sucess: "sucessful",
            user: newUser
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
async function getUser(req, res) {
    try {
        let { user_id } = req.params;
        let user = await userModel.getUserById(user_id);
        if (user == undefined) {
            res.status(404).json({
                status: "failure",
                message: "User not found"
            })
        }
        res.status(200).json({
            status: "User Found",
            user: user
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
async function updateUser(req, res) {
    let { user_id } = req.params;
    let updateObj = req.body;
    if (req.file) {
        img = req.file.filename;
        updateObj.img_url = img;
    }
    //sq=>update
    try {
        const response = await userModel.updateUserModel(user_id, updateObj);
        //get
        const user = await userModel.getUserById(user_id);
        // send respone
        res.status(200).json({
            sucess: "sucessful",
            user: user
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            user: err.message
        })
    }
}

// get all applied user
async function getAllAppliedUser(req, res) {
    try {
        let { job_id } = req.params
        let user = await userModel.allAppliedStudentsModel(job_id);
        if (user == undefined) {
            res.status(404).json({
                status: "failure",
                message: "User not found"
            })
        }
        res.status(200).json({
            status: "User Found",
            user: user
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

async function getUserCount(req, res) {
    try {
        let dataArr=[]
        let placed = await userModel.getPlacedUserCountModel();
        let total= await userModel.getUnplacedUserCountModel();
        dataArr.push(placed);
        dataArr.push(total-placed)
        res.status(200).json({
            status: "Count Found",
            dataArr: dataArr 
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.getAllAppliedUser = getAllAppliedUser;
module.exports.getUserCount=getUserCount;

