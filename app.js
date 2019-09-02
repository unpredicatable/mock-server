/*
 *@author:yzbyxmx
 *@Date: 2019-08-30
 *@Description: main entry
 */
//server 主入口

const Koa = require('koa')
const mysql = require('mysql')
const config = require('./config')
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const connectionPool = mysql.createPool(config)
connectionPool.getConnection((err,db) => {
    if(err){
        console.log('CONNECTION ERR',err)
    }else {
        console.log('CONNECTION SUCCESS')
    }
})

app.use(cors());
app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser());

const user_router = require('./routes/api/user_router')

app.use(user_router.routes()).use(user_router.allowedMethods());

app.listen(8888)
console.log('demo in run ')
