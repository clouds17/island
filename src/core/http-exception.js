const ms = require("ms")

class HttpException extends Error {
    constructor(msg, errorCode, code) {
        super()
        this.msg = msg || '服务端异常'
        this.errorCode = errorCode || 10001
        this.code = code || 500
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10002
        this.code = 400
    }
}

class SuccessException extends HttpException {
    constructor(msg = 'ok', data = null) {
        super()
        let code = msg.includes('创建') ? 201 : 200
        this.msg = msg
        this.errorCode = this.errorCode || 10000
        this.code = code
        this.data = data
    }
}

class NotFoundException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10003
        this.code = 404
    }
}

class AuthFailedException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

class ForbbidenException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10005
        this.code = 403
    }
}

module.exports = {
    HttpException,
    ParameterException,
    SuccessException,
    NotFoundException,
    AuthFailedException,
    ForbbidenException
}