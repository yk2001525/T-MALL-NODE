class BaseModel {
    constructor(data, message) {
        if(data){
            this.data = data
        }
        if(message) {
            this.message = message
        }
    }    
}

class SuccessModel extends BaseModel {
    constructor(data, message){
        super(data, message)   //调用父类构造函数,只能出现在子类的构造函数。
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message){
        super(data, message)
        this.errno = -1
    }
}

module.exports= {
    SuccessModel,
    ErrorModel
}