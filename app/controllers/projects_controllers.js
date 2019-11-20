const query = require('../../query')
// 仓库创建
const create = async (ctx, next) => {
    const req = ctx.request.body
    const memberIds = req.memberIds.join('、')
    const description = req.description || (req.name + 'mock')
    const projectId = new Date().getFullYear() + Math.ceil(Math.random()*1000)
    // 创建之前先做projectId 唯一性判断
    const searchPid = "select * from projects where projectId='" + projectId +"'"
    const searchResult = await query.queryData(req, searchPid)

    if (searchResult.length > 1) {
        ctx.status = 200;
        ctx.body = {
            code: 1,
            msg: '项目创建失败, 与已有项目冲突!!',
            data:false
        }
        return
    } else {
        const sql = "insert into projects set name='"+req.name+"',description='"+ description +"',creatorId='"+req.creatorId+"'"+",memberIds='"+memberIds +"',ownerId='"+req.creatorId+"',projectId="+projectId
        const createResult = await query.queryData(req,sql)
        if (createResult.insertId) {
            ctx.body = {
                code: 0,
                msg: '项目创建成功',
                data:false
            }
        }
        return
    }
    ctx.status = 200;
    ctx.body = {
        code: 1,
        msg: '创建失败，请稍后再试!!',
        data: false
    }
}

// 仓库更新
const update = async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        msg: '234',
        data: {
            data: ctx.request.query
        }
    }
}

// 用户仓库删除
const remove = async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        msg: '345',
        data: {
            data: ctx.request.query
        }
    }
}

module.exports = {
    create,
    update,
    remove
}