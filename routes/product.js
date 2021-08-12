var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel} = require('../model/resModel')
const {SearchProduct,GetProduct,addShopCart,checkShopCart,addShopNum,cutShopNum,getMyShopCart,deleteShopCart,checkProduct,allCheck,allNoCheck} = require('../controller/product')

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

router.post('/checkshopcart',function(req,res,next){
    const {user_id,product_id} = req.body
    const result = checkShopCart(user_id,product_id)
    return result.then((List)=>{
        res.json(
            new SuccessModel(List) 
        )
    })
})

router.post('/addshopcartnum',function(req,res,next){
    const {user_id,product_id}=req.body
    addShopNum(user_id,product_id)
    const results = getMyShopCart(user_id)
    return results.then((List)=>{
        res.json(
            new SuccessModel(List)
        )
    })

})
router.post('/cutshopcartnum',function(req,res,next){
    const {user_id,product_id}=req.body
    cutShopNum(user_id,product_id)
    const results = getMyShopCart(user_id)
    return results.then((List)=>{
        res.json(
            new SuccessModel(List)
        )
    })
})
router.post('/getshopcart',function(req,res,next){
    const{user_id}=req.body
    const result = getMyShopCart(user_id)
    return result.then((List)=>{
        res.json(
            new SuccessModel(List)
        )
    })

})
router.post('/deleteshopcart',function(req,res,next){
    const {user_id,product_id} = req.body
    const result = deleteShopCart(user_id,product_id)
    const results = getMyShopCart(user_id)
    return results.then((List)=>{
        res.json(
            new SuccessModel(List)
        )
    })
})
router.post('/checkproduct',function(req,res,next){
    const{user_id,product_id} = req.body
    const result = checkProduct(user_id,product_id)
    return result.then((Results)=>{
        res.json(
            new SuccessModel(Results)
        )
    })

})
router.post('/allcheck',function(req,res,next){
    const {user_id} = req.body
    const result = allCheck(user_id)
    return result.then((Results)=>{
        res.json(
            new SuccessModel(Results)
        )
    })
})
router.post('/allnocheck',function(req,res,next){
    const {user_id} = req.body
    const result = allNoCheck(user_id)
    return result.then((Results)=>{
        res.json(
            new SuccessModel(Results)
        )
    })
})
module.exports = router;
