const express=require("express");
const { createJob, getJob, getAllJobs, getEligibleJobs, userEligible, applyJob, getAppliedJobs, hasAppliedJob, withdrawJob, updateJob } = require("../controller/jobController");
const jobRouter=new express.Router();

jobRouter.post("/",createJob);
jobRouter.route("/:job_id").get(getJob).patch(updateJob);
jobRouter.route("/").get(getAllJobs);
jobRouter.route("/apply").post(applyJob)
jobRouter.route("/apply/:job_id").get(getAppliedJobs);
jobRouter.route("/search/:user_id").get(getEligibleJobs);
jobRouter.route("/eligible/:user_id/jb/:job_id").get(userEligible)
jobRouter.route("/:user_id/check/:job_id").get(hasAppliedJob).delete(withdrawJob)
module.exports.jobRouter=jobRouter;