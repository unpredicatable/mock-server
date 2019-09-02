const config = require('./config')
const mysql = require('mysql')
const connectionPool = mysql.createPool(config)

const queryData = (req,sql) => {
    return new Promise((resolve ,reject) => {
        connectionPool.getConnection((err,db) => {
            if(err) {
                reject(err)
            }else {
                db.query(sql,(err,rows) => {
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

module.exports.queryData = queryData