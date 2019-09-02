const config = require('../../config')
const mysql = require('mysql')
const connectionPool = mysql.createPool(config)

const searchInfo = (req) => {
    return new Promise((resolve ,reject) => {
        let modSql = "select passWord from userInfo where userName='"+req.userName+"'";
        connectionPool.getConnection((err,db) => {
            if(err) {
                reject(err)
            }else {
                db.query(modSql,(err,rows) => {
                    if(err) {
                        reject(err)
                    }else {
                        resolve(JSON.parse(JSON.stringify(rows)))
                    }
                })
            }
            db.release()
        })
    })
}

module.exports.searchInfo = searchInfo