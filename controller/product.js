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
    let sql = `insert into shopcart (user_id,product_id,num) VALUES ('${user_id}','${product_id}','1')`
    return exec(sql)
}

module.exports={
    GetProduct,
    SearchProduct,
    addShopCart
}
