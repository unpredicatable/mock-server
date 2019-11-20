const query = require('../../query')

const feedback = async (ctx, next) => {
    const req = ctx.request.body
    const createTime = '2017-08-31'
    const sql = "insert into feedbackInfos set content='" + req.content +"',email='"+req.email+"',createTime="+createTime
    const feedbackResult = await query.queryData(req, sql)
    if (feedbackResult.insertId) {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: '反馈信息提交成功',
        }
        return
    }
    ctx.body = {
        code: 1,
        msg: '反馈信息提交失败'
    }

}

module.exports = {
    feedback
}