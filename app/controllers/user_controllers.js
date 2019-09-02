const user = require('../models/user')


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
    // 获取用户的 userId
    const result = await user.searchInfo(req);
    let match = false
    if (!result) {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: 'account or password error!'
        }
        return;
    }
    result.length && result.map((cur,index) => {
        if(cur.passWord == req.passWord){
            match = true
        }
    })
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
    console.log('ctx',req)
    ctx.body = {
        code:1,
        msg:'login success',
        data:'admin'
    }
}


module.exports = {
    login,
    post,
    get,
    register
}