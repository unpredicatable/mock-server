const query = require('../../query')
const passport = require('../utils/passport')
const get = async (ctx, next) => {
    console.log('ctx',ctx)
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
    if (!result) {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: 'account or password error!',
            data:false
        }
        return;
    }
    const match = await passport.validate(req.passWord , result[0].passWord)
    // result.length && result.map((cur,index) => {
    //     if(cur.passWord == req.passWord){
    //         match = true
    //     }
    // })
    ctx.status = 200;
    if (match) {
        ctx.body = {
            code: 1,
            msg: 'login success',
            data:true
        }
        return;
    }

    ctx.body = {
        code: 0,
        msg: 'account or password error!'
    }
}

const register = async (ctx,next) => {
    const req = ctx.request.body
    const hash = await passport.encrypt(req.passWord)
    let sql = "select * from userInfo where userName='"+req.userName+"'";
    let uid = 20190901+ new Date().getTime()
    const result = await  query.queryData(req,sql)
    if(result.length > 0) {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: 'userName has been already!',
            data:false
        }
        return
    }else {
        const sql = "insert into userInfo set uid='"+uid+"'"+",userName='"+req.userName +"'"+",passWord='"+hash+"'"+",tel='"+req.tel+"'"+",email='"+req.email+"'"
        const registResult = await query.queryData(req,sql)
        if(registResult.insertId){
            ctx.status = 200;
            ctx.body = {
                code: 1,
                msg: 'insert successfully!!',
                data: true
            }
            return
        }
    }
    ctx.body = {
        code: 0,
        msg: 'insert fail!'
    };

}


module.exports = {
    login,
    post,
    get,
    register
}