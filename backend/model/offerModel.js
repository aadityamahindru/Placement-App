const db = require("../utility/connection.js");

const updateOfferStatusModel = function (id, updateObj) {
    let { job_id, ol } = updateObj;
    var query = `UPDATE user_jobs SET ol=${ol} WHERE user_id="${id}" and jobid="${job_id}"`
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
const checkIfGotOfferModel = function (uid, jid) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT ol from user_jobs WHERE user_id="${uid}" and jobid="${jid}"`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                let res=false;
                if(result.length!=0){
                    res = result[0].ol == 1;
                }
                resolve(res);
            }
        })
    })
}
const avgPackageModel = function () {
    return new Promise(function (resolve, reject) {
        db.query(`select (select sum(jobs.ctc) from jobs,user_jobs where user_jobs.ol=true and jobs.job_id=user_jobs.jobid)*1.0 div (select count(*) from user where is_admin=false) as avg`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].avg);
            }
        })
    })
}
const maxPackageModel = function () {
    return new Promise(function (resolve, reject) {
        db.query(`select max(ctc) as max from (select company_name,ctc from jobs,user_jobs where user_jobs.ol=true and jobs.job_id=user_jobs.jobid) as t`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].max);
            }
        })
    })
}

const totalOfferModel = function () {
    return new Promise(function (resolve, reject) {
        db.query(`select count(*) as count from user_jobs where ol=true`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result[0].count);
            }
        })
    })
}
const getuserOffersModel = function (id) {
    return new Promise(function (resolve, reject) {
        db.query(`select * from jobs as j,user_jobs as uj where j.job_id =uj.jobid and uj.user_id="${id}" and uj.ol=true `, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}
const getAllPlacedStudentsModel = function () {
    return new Promise(function (resolve, reject) {
        db.query(`select distinct first_name,last_name,enroll_no,phone,email_id from user as u,user_jobs as uj where u.uid=uj.user_id and ol=true`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}
module.exports.updateOfferStatusModel = updateOfferStatusModel;
module.exports.checkIfGotOfferModel = checkIfGotOfferModel;
module.exports.avgPackageModel = avgPackageModel;
module.exports.maxPackageModel = maxPackageModel;
module.exports.totalOfferModel = totalOfferModel;
module.exports.getuserOffersModel = getuserOffersModel;
module.exports.getAllPlacedStudentsModel=getAllPlacedStudentsModel;