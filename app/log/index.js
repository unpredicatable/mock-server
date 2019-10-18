/**
 * created by star on 2019/10/18 日志方法
 *
 * */
const momemt = require('moment')

const loginLog = (userName) => {
    let str = '用户' + userName + ' 于 ' + momemt().format() +'成功登录'
    console.log(str)
}

module.exports = {
    loginLog
}
