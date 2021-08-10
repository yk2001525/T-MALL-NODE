var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel} = require('../model/resModel')
const {SearchProduct,GetProduct,addShopCart} = require('../controller/product')

router.post('/getproduct',function(req,res,next){
    const result = GetProduct()
    return result.then((List)=>{
        res.json(
            new SuccessModel(List)
        )
    })
})

router.post('/search',function(req,res,next){
    const {keyword} = req.body
    const result = SearchProduct(keyword)
    return result.then(productList=>{
        res.json(
            new SuccessModel(productList)
        )
    })

})

router.post('/addshopcart',function(req,res,next){
    const {user_id,product_id} = req.body
    const result = addShopCart(user_id,product_id)
    return result.then(list=>{
        res.json(
            new SuccessModel(list)
        )
    })
})


module.exports = router;
