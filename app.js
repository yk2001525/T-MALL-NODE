var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var vertoken = require('./token/token')
var expressJwt = require('express-jwt')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// 解决跨域
app.use((req, res, next) => {
  //设置请求头
  res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Max-Age': 1728000,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers':'x-requested-with,content-type,Authorization'
      

  })
  
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

//解析token获取用户信息
app.use(function(req, res, next) {
  var token = req.headers['authorization'];
  if(token == undefined){
      return next();
  }else{
      vertoken.getToken(token).then((data)=> {
          req.data = data;
          return next();
      }).catch((error)=>{
          return next();
      })
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//验证token是否过期并规定那些路由不需要验证
app.use(expressJwt({
  secret:'zgs_first_token',
  algorithms:['HS256']
}).unless({
  path:['/users/login']  //不需要验证的接口名称
})) 


//token失效返回信息
app.use(function(err,req,res,next){
  if(err.status==401){
      return res.status(401).send('token失效')
       //可以设置返回json 形式  res.json({message:'token失效'})
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
