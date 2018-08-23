var express = require('express');
var router = express.Router();
var Goods = require('../models/goods');
var server=express();
/* GET users listing. */
//4.路由获取
router.post('/goods',function(req, res, next) {
	//5.查询mongoDB的goods数据  基于mongoose实现商品列表的查
	console.log(req.body)
	let type=req.body.params.type;
	let price=req.body.params.price;
	let place=req.body.params.place;
	let name=req.body.params.name;
	let discript=req.body.params.discript;
	let connact=req.body.params.connact;
	let src=req.body.params.src;
	var newGood={
		"productName":name,
		"productPrice":parseInt(price),
		"productConnact":connact,
		"productPlace":place,
		"productDescript":discript,
		"productSrc":src,
		"productType":type
      }
      var good=new Goods(newGood);
      console.log(good)
	  good.save(function(err){
        if(err){
		  console.log(err)
		  res.json({
			status:'1',
			msg:'数据插入失败',
			result:false
		  })
        }else{
        console.log("成功插入") 
        res.json({
        status:'0',
        msg:'数据插入成功',
        result:true
      })
    }
    })
})
router.get('/goods', function(req, res, next) {
	//5.查询mongoDB的goods数据  基于mongoose实现商品列表的查
	if(req.query.goodId){
		console.log("查找一个商品")
		Goods.findOne({_id:req.query.goodId},function(err,result){
			if(err){
				res.json({
					status:'1',
					msg:'失败'
				})
				console.log(err)
			}else{
				console.log(result);
				res.json({
					status:'0',
					msg:'成功',
					result:result
				})
			}
		})	
	}else{
		console.log(req.query)
		console.log("查全部")
		let type=req.param("type");
		let page=parseInt(req.param("page"));
		let pageSize=parseInt(req.param("pageSize"));
		let sort=parseInt(req.param("sort"));
		let skip=(page-1)*pageSize;
		let goodModel=Goods.find({productType:type}).skip(skip).limit(pageSize);
		goodModel.sort({'productPrice':sort});
		goodModel.exec(function(err,doc){
			if(err){
				res.json({
					status:'1',
					msg:err.message
				})
			}else{
				Goods.find({productType:type},function(err,result){
					jsonArray={list:doc,total:result.length}
					res.json({
						status:'0',
						msg:'',
						result:jsonArray
					})
				})
			}
	 
		})
	}

  	// res.send('hello,goods');
})
module.exports = router;
