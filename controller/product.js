const {exec} = require('../db/mysql')

const GetProduct = ()=>{
    let sql = `select * from product`
    return exec(sql)
}

const SearchProduct =(keyword)=>{
    let sql = `select * from product where product_name like '%${keyword}%'`
    return exec(sql)
}
const addShopCart = (user_id,product_id)=>{
    let sql = `insert into shopcart (user_id,product_id,num,checked) VALUES ('${user_id}','${product_id}','1','1')`
    return exec(sql)
}
const checkShopCart = (user_id,product_id)=>{
    let sql = `select * from shopcart where user_id = '${user_id}' and product_id = '${product_id}'`
    return exec(sql)
}
const addShopNum = (user_id,product_id)=>{
    let sql = `update shopcart set num = num+1 where user_id = '${user_id}' and product_id = '${product_id}'`
    return exec(sql)
}
const cutShopNum = (user_id,product_id)=>{
    let sql = `update shopcart set num = num-1 where user_id = '${user_id}' and product_id = '${product_id}'`
    return exec(sql)
}
const getMyShopCart=(user_id)=>{
    let sql = `select * from product,shopcart WHERE product.product_id = shopcart.product_id and shopcart.user_id = '${user_id}'`
    return exec(sql)
}
const deleteShopCart=(user_id,product_id)=>{
    let sql = `delete from shopcart where user_id = '${user_id}' and product_id = '${product_id}'`
    return exec(sql)
}

const checkProduct = (user_id,product_id)=>{
    let sql = `update shopcart set checked = !checked where user_id = '${user_id}' and product_id = '${product_id}'`
    return exec(sql)
}
const allCheck = (user_id)=>{
    let sql = `update shopcart set checked = 1 where user_id = '${user_id}'`
    return exec(sql)
}
const allNoCheck = (user_id)=>{
    let sql = `update shopcart set checked = 0 where user_id = '${user_id}'`
    return exec(sql)
}
module.exports={
    GetProduct,
    SearchProduct,
    addShopCart,
    checkShopCart,
    addShopNum,
    cutShopNum,
    getMyShopCart,
    deleteShopCart,
    checkProduct,
    allCheck,
    allNoCheck
}
