var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtScrect = 'zgs_first_token';  //签名

const { getUserList,UserRegister,SearchUser,UserLoginIn } = require('../controller/users')
const { SuccessModel, ErrorModel} = require('../model/resModel')
  //引入token 
var vertoken=require('../token/token')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.data)
  // res.send('respond with a resource');
  if(req.data !== undefined){
    // res.send('当前已登录')
    res.json(
      req.data
    )
  }else{
    res.send('未登录')
  }
});
router.get('/user',function(req,res,next){
  const result = getUserList()
  return result.then(userList=>{
    res.json(
      new SuccessModel(userList)
    )
  })
})

router.post('/newuser',function(req,res,next){
  const {userId,userPassword} = req.body
  const result = SearchUser(userId)
  return result.then(result1=>{
    if(result1.length !== 0){
      res.json(
        new ErrorModel(result1)
      )
    }else{
      const results = UserRegister(userId,userPassword)
      return results.then(result2=>{
        res.json(
          new SuccessModel(result2)
        )
      })
    }
  })
  // const result = UserRegister(userId,userPassword)
 
 
})

router.post('/loginin',function(req,res,next){
  // console.log('token解析出来的',req.data)
  const {userId,userPassword} = req.body
  const result = UserLoginIn(userId,userPassword)
  return result.then(results=>{
    // console.log(results.length)
    console.log(results)
    if(results.length === 0)
      res.json(
        new ErrorModel(results)
      )
    else{
      vertoken.setToken(userId,userPassword).then(token=>{
        return res.json({
          code:200,
          message:'登陆成功',
          token:token,
          userInfo:results[0]
        })
      })
      
    }
    // res.json(
    //   new SuccessModel(results)
    // )
  })
})

module.exports = router;
