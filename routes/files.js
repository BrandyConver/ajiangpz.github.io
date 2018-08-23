const express=require('express');
const pathlib=require('path');
const router = express.Router();
const fs=require('fs');
router.post('/files',function(req,res,next){
    console.log(req.files[0].originalname)
    var newName=req.files[0].path+pathlib.parse(req.files[0].originalname).ext;
    console.log(newName);
    fs.rename(req.files[0].path,newName,function(err){
        if(err){
            res.json({
                status:'1',
                msg:'文件上传失败'
            })
        }else{
            res.json({
                status:'0',
                msg:'文件上传成功',
                result:newName

            })
        }
    })
})
module.exports = router