const express = require('express');
const router = express.Router();
const Users = require('../models/users');
var server=express();
/* GET users listing. */
router.post('/users', function(req, res, next) {
  console.log(req.body)
  let type=req.body.params.type;  
  var user=req.body.params.user;
  var pass=parseInt(req.body.params.pass);
  if(type=="login")
  {
    console.log("登录")  
    console.log(user)
  Users.findOne({user:user,pass:pass},function(err,doc){
    console.log(doc)
    var isOk=true;
    if(err){
      isOk=false;
      res.json({
        status:'1',
        msg:err.message,
      })
    }else if(doc!=null){    
        // res.cookie('name',user,{path:'/',maxAge:30*24*3600*1000});
        if(req.session.user!==user){
          req.session.user=user;

          console.log(req.session.user+"，第一次登录")
        }else{
          
          console.log(req.session.user+"，欢迎回来")
        }
        res.json({
        status:'0',
        msg:'欢迎来到校园二手',
        result:true
      })  
    }else{
      res.json({
        status:'0',
        msg:'用户或密码错误',
        result:false
      }) 
    }
  })
}else if(type=="register"){
  console.log("注册")
  console.log(user)
    Users.find({user:user},function(err,doc){
      console.log(doc)
    if(err){
      console.log("出错了")
      res.json({
        status:'1',
        msg:err.message,
      })
      console.log(err.message)
    }
    else if(doc.length!==0){
      console.log(doc)
      res.json({
        status:'0',
        msg:'用户已存在',
        result:false
      })
    }else{
      var newUser={
        "user":req.body.params.user,
        "pass":pass
      }
      var user=new Users(newUser);
      console.log(user)
      user.save(function(err){
        if(err){
          console.log(err)
        }else{
          console.log("成功插入") 
          res.json({
        status:'0',
        msg:'注册成功',
        result:true
      })
        }
      })
     
    } 
  })

} 
});

module.exports = router;
