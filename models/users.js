var mongoose = require('mongoose'); 
//Schema表模型   获取mongoose的Schema
var Schema = mongoose.Schema;
//定义商品模型
var produtSchema = new Schema({
	"user":String,
	"pass":Number
},{versionKey:false});
//把mongoose的 model中 goods模块暴露出来
module.exports = mongoose.model('user',produtSchema);