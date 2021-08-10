const {exec} = require('../db/mysql')

const GetProduct = ()=>{
    let sql = `select * from product`
    return exec(sql)
}

const SearchProduct =(keyword)=>{
    let sql = `select * from product where product_name like '%${keyword}%'`
    return exec(sql)
}

module.exports={
    GetProduct,
    SearchProduct
}
