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
app.use(bodyParser())

const user_router = require('./routes/api/user_router')
const projects_router = require('./routes/api/projects_router')
const main_router = require('./routes/api/main_router')

app.use(user_router.routes()).use(user_router.allowedMethods())
app.use(projects_router.routes()).use(projects_router.allowedMethods())
app.use(main_router.routes()).use(main_router.allowedMethods())


app.listen(8888)
console.log('mock-server is running')
