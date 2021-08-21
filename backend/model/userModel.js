const db = require("../utility/connection.js");
const createUserModel = function (entityObj) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO user SET ?`, entityObj, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(entityObj);
            }
        });
    })
}
const getUserById = function (id) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * from user WHERE uid="${id}"`, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        })
    })
}
const updateUserModel = function (id, updateObj) {
    let updateStr = "";
    for (key in updateObj) {
        updateStr += `${key} = "${updateObj[key]}",`
    }
    updateStr = updateStr.substring(0, updateStr.length - 1);
    var query = `UPDATE user SET ${updateStr} WHERE uid="${id}"`
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

const allAppliedStudentsModel=function(job_id){
    return new Promise(function(resolve,reject){
        db.query(`select * from user,user_jobs where user.uid=user_jobs.user_id and user_jobs.jobid="${job_id}" order by user.first_name,user.last_name`,
        function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    })
}
const getPlacedUserCountModel=function(){
    return new Promise(function(resolve,reject){
        db.query(`select distinct uid from user as u,user_jobs as uj where u.uid=uj.user_id and uj.ol=true`,function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result.length);
            }
        });
    })
}
const getUnplacedUserCountModel=function(){
    return new Promise(function(resolve,reject){
        db.query(`select * from user where is_admin=false`,function (err, result) {
            if(err){
                reject(err);
            }else{
                resolve(result.length);
            }
        });
    })
}

module.exports.updateUserModel=updateUserModel;
module.exports.getPlacedUserCountModel=getPlacedUserCountModel;
module.exports.getUnplacedUserCountModel=getUnplacedUserCountModel;
module.exports.createUserModel = createUserModel;
module.exports.getUserById = getUserById;
module.exports.allAppliedStudentsModel=allAppliedStudentsModel;

