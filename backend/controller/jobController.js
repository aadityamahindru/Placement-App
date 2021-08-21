const jobModel = require("../model/jobModel");
const userModel = require("../model/userModel");
async function createJob(req, res) {
    try {
        let newJob = await jobModel.createJobModel(req.body);
        res.status(201).json({
            sucess: "sucessful",
            job: newJob
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
async function getJob(req, res) {
    try {
        let { job_id } = req.params;
        let job = await jobModel.getJobById(job_id);
        if (job == undefined) {
            res.status(404).json({
                status: "failure",
                message: "Job not found"
            })
        }
        res.status(200).json({
            status: "Job Found",
            job: job
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
//update job
async function updateJob(req, res) {
    let { job_id } = req.params;
    let updateObj = req.body;
    //sq=>update
    try {
        const response = await jobModel.updateJobsModel(job_id, updateObj);
        res.status(200).json({
            sucess: "sucessful",
            job: response
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            job: err.message
        })
    }
}
// get all jobs

async function getAllJobs(req, res) {
    try {
        let jobs = await jobModel.getAllJobsModel();
        res.status(200).json({
            status: "Jobs Found",
            jobs: jobs
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

//array of  eligible jobs
async function getEligibleJobs(req, res) {
    try {
        let { user_id } = req.params;
        let user = await userModel.getUserById(user_id);
        if (user == undefined) {
            res.status(404).json({
                status: "failure",
                message: "User not found"
            })
        }
        let { tenth_per, twelve_per, grad_per, backlogs } = user;
        let details = { tenth_per, twelve_per, grad_per, backlogs };
        let jobs = await jobModel.getEligibleJobsModel(details)
        res.status(200).json({
            status: "Jobs Found",
            jobs: jobs,
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

// check eligibility
async function userEligible(req, res) {
    try {
        let { user_id, job_id } = req.params;
        let currJob = await jobModel.getJobById(job_id);
        let user = await userModel.getUserById(user_id);
        let { tenth_per, twelve_per, grad_per, backlogs } = user;
        let details = { tenth_per, twelve_per, grad_per, backlogs };
        let jobs = await jobModel.getEligibleJobsModel(details)
        let isEligible=jobs.filter(job=>job.company_name==currJob.company_name).length>0;
        res.status(200).json({
            status: "Jobs Found",
            eligible: isEligible,
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}

// apply job
async function applyJob(req,res){
    try {
        let applied = await jobModel.applyJobModel(req.body);
        res.status(201).json({
            sucess: "sucessful",
            applied: applied
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
// withdraw Job
async function withdrawJob(req,res){
    try {
        let{user_id,job_id}=req.params;
        let withdraw = await jobModel.withdrawJobModel(user_id,job_id);
        res.status(201).json({
            sucess: "sucessful",
            withdraw: withdraw
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
// array of all applied jobs
async function getAppliedJobs(req, res) {
    try {
        let { job_id } = req.params;
        let jobs = await jobModel.getAppliedJobsModel(job_id);
        if (jobs == undefined) {
            res.status(404).json({
                status: "failure",
                message: "Job not found"
            })
        }
        res.status(200).json({
            status: "Job Found",
            jobs: jobs
        })

    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
// has applied
async function hasAppliedJob(req,res){
    try {
        let{user_id,job_id}=req.params;
        let applied = await jobModel.hasAppliedJobModel(user_id,job_id);

        res.status(201).json({
            sucess: "sucessful",
            applied: applied.length>0
        })
    } catch (err) {
        res.status(500).json({
            sucess: "failure",
            message: err.message
        })
    }
}
module.exports.getJob = getJob;
module.exports.userEligible = userEligible;
module.exports.createJob = createJob;
module.exports.getAllJobs = getAllJobs;
module.exports.getEligibleJobs = getEligibleJobs;
module.exports.applyJob=applyJob;
module.exports.getAppliedJobs=getAppliedJobs
module.exports.hasAppliedJob=hasAppliedJob;
module.exports.withdrawJob=withdrawJob;
module.exports.updateJob=updateJob;