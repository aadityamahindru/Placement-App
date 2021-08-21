const express=require("express");
const { createUser, getUser, updateUser, getAllAppliedUser, getUserCount,} = require("../controller/userController");
const userRouter=new express.Router();
const multer=require("multer");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+".jpeg");
    }
})
const fileFilter=function(req,file,cb){
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(new Error("Not an image"));
    }
}
const upload=multer({
    storage:storage,
    fileFilter:fileFilter
})


userRouter.post("/",createUser);
userRouter.get("/count",getUserCount);
userRouter.route("/applied/:job_id").get(getAllAppliedUser)
userRouter.route("/:user_id").get(getUser).patch(upload.single("user"),updateUser);
module.exports.userRouter=userRouter;