const express=require("express");
const { jobRouter } = require("./router/jobRouter");
const { offerRouter } = require("./router/offerRouter");
const { userRouter } = require("./router/userRouter");

const app=express();

app.use(express.static('public'));

app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/jobs",jobRouter);
app.use("/api/offers",offerRouter);

const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`Listening to server at port ${port}`))