const bcrypt = require('bcrypt');


//密码加密
const encrypt = async (password, saltTimes) => {
    const hash = await bcrypt.hash(password,10)
    return hash
};

//密码hash校验
const validate = async (password,hash) => {
    const match = await bcrypt.compare(password, hash);
    return match
}


module.exports = {
    encrypt,
    validate
}

