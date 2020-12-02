const express=require("express");
const { jobRouter } = require("./router/jobRouter");
const { userRouter } = require("./router/userRouter");

const app=express();

app.use(express.static('public'));

app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/jobs",jobRouter);
app.listen(4000,()=>console.log("Listening to server at port 4000"))