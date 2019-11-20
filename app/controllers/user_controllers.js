const query = require('../../query')
const passport = require('../utils/passport')
const log = require('../log/index')

const get = async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        msg: 'get request!!',
        data: {
            data: ctx.request.query
        }
    }
}

const post = async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        msg: 'post request!!',
        data: {
            data: ctx.request.body
        }
    }
}

const login = async (ctx ,next) => {
    const req = ctx.request.body
    const sql = "select passWord from userInfo where userName='"+req.userName+"'";
    // 获取用户的 userId
    const result = await query.queryData(req,sql);
    if (result.length === 0) {
        ctx.status = 200;
        ctx.body = {
            code: 1,
            msg: '账号或密码错误!',
            data:false
        }
        return;
    }
    const match = await passport.validate(req.passWord , result[0].passWord)
    ctx.status = 200;
    if (match) {
        const getUserId = "select * from members where fullName='" + req.userName+"'"
        const userId = await query.queryData(req, getUserId)
        log.loginLog(req.userName)
        ctx.body = {
            code: 0,
            msg: '登陆成功',
            data:true,
            userInfo: userId[0] || {}
        }
        return;
    }

    ctx.body = {
        code: 1,
        msg: '账号或密码错误!'
    }
}

const register = async (ctx,next) => {
    const req = ctx.request.body
    const hash = await passport.encrypt(req.passWord)
    let sql = "select * from userInfo where userName='"+req.userName+"'";
    let uid = 20190901+ new Date().getTime() || ''
    let userName = req.userName || ''
    let tel = req.tel || ''
    let email = req.email || ''
    const result = await  query.queryData(req,sql)
    if(result.length > 0) {
        ctx.status = 200;
        ctx.body = {
            code: 1,
            msg: '注册失败，用户名已被注册!',
            data:false
        }
        return
    }else {
        const sql = "insert into userInfo set uid='"+uid+"'"+",userName='"+userName +"'"+",passWord='"+hash+"'"+",tel='"+tel+"'"+",email='"+email+"'"
        const registResult = await query.queryData(req,sql)
        if(registResult.insertId){
            // 基本信息写入members基本表
            const baseInfoSql = "insert into members set uid='"+uid+"'"+",fullName='"+userName +"'"+",email='"+email+"'"
            const baseInserResult = await query.queryData(req,baseInfoSql)
            if (baseInserResult.insertId) {
                ctx.status = 200;
                ctx.body = {
                    code: 0,
                    msg: '注册成功!',
                    data: true
                }
                return
            }
        }
    }
    ctx.body = {
        code: 1,
        msg: '注册失败!'
    };

}

module.exports = {
    login,
    post,
    get,
    register
}