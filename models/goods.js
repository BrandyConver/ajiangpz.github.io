var mongoose = require('mongoose'); 
//Schema表模型   获取mongoose的Schema
var Schema = mongoose.Schema;
//定义商品模型
var produtSchema = new Schema({
	"productId":String,
	"productName":String,
	"productPrice":Number,
    "productConnact":String,
    "productPlace":String,
    "productDescript":String,
    "productSrc":String,
    "productType":String
});
//把mongoose的 model中 goods模块暴露出来
module.exports = mongoose.model('Good',produtSchema);