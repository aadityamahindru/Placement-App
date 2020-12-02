const db=require("../utility/connection.js");
const uniqid=require('uniqid');
const createJobModel=function(entityObj){
    entityObj.job_id=uniqid();
    return new Promise(function(resolve,reject){
        db.query(`INSERT INTO jobs SET ?`, entityObj, function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(entityObj);
            }
        });
    })
}
const getJobById=function(id){
    return new Promise(function(resolve,reject){
        db.query(`SELECT * from jobs WHERE job_id="${id}"`,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result[0]);
            }
        })
    })
}

//update job
const updateJobsModel = function (id, updateObj) {
    let updateStr = "";
    for (key in updateObj) {
        updateStr += `${key} = "${updateObj[key]}",`
    }
    updateStr = updateStr.substring(0, updateStr.length - 1);
    var query = `UPDATE jobs SET ${updateStr} WHERE job_id="${id}"`
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

const getAllJobsModel=function(){
    return new Promise(function(resolve,reject){
        db.query('SELECT * from jobs',function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}
const getEligibleJobsModel=function(details){
    let{tenth_per,backlogs,twelve_per,grad_per}=details;
    return new Promise(function(resolve,reject){
        db.query(`SELECT * from jobs WHERE tenth_per <= ${tenth_per} AND twelve_per <= ${twelve_per} AND grad_per <= ${grad_per} AND backlogs >= ${backlogs}`,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}
const applyJobModel=function(entityObj){
    return new Promise(function(resolve,reject){
        db.query(`INSERT INTO user_jobs SET ?`, entityObj, function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(entityObj);
            }
        });
    })
}

const getAppliedJobsModel=function(id){
    return new Promise(function(resolve,reject){
        db.query(`select * from (select * from user_jobs,jobs where jobs.job_id=user_jobs.jobid) as t  where t.user_id="${id}"`,function(err,result){
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}


//get applied job staus
const hasAppliedJobModel=function(uid,jid){
    return new Promise(function(resolve,reject){
        db.query(`SELECT * FROM user_jobs WHERE user_id="${uid}" AND jobid="${jid}"`,function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}

// delete job
const withdrawJobModel=function(uid,jid){
    return new Promise(function(resolve,reject){
        db.query(`DELETE FROM user_jobs WHERE user_id="${uid}" AND jobid="${jid}"`,function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}
module.exports.createJobModel=createJobModel;
module.exports.getJobById=getJobById;
module.exports.getAllJobsModel=getAllJobsModel;
module.exports.getEligibleJobsModel=getEligibleJobsModel
module.exports.applyJobModel=applyJobModel;
module.exports.getAppliedJobsModel=getAppliedJobsModel;
module.exports.hasAppliedJobModel=hasAppliedJobModel;
module.exports.withdrawJobModel=withdrawJobModel;
module.exports.updateJobsModel=updateJobsModel;
