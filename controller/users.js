const { exec } = require('../db/mysql')

// 获取用户列表
const getUserList=()=>{
    let sql = `select * from user`
    return exec(sql)
}
// 注册用户
const UserRegister=(userId,userPassword)=>{
    let sql = `insert into user VALUES ('${userId}','${userPassword}')`
    return exec(sql)
}
// 寻找用户是否存在
const SearchUser=(userId)=>{
    let sql = `select * from user where user_id = '${userId}'`
    return exec(sql)
}
// 用户登录
const UserLoginIn = (userId,userPassword)=>{
    let sql = `select * from user where user_id = '${userId}' and user_password = '${userPassword}'`
    return exec(sql)
}
module.exports={
    getUserList,
    UserRegister,
    UserLoginIn,
    SearchUser
}