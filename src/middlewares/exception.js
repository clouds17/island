const { HttpException } = require('../core/http-exception')
const catchError = async (ctx, next) => {
    try {
       await next()
    } catch(error) {
        const isHttpException = error instanceof HttpException

        if (isHttpException) {
            let resultData = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method}: ${ctx.path}`
            }
            if (error.data) {
                resultData.data = error.data
            }
            // 已知异常
            ctx.body = resultData
            ctx.status = error.code
        } else {
            let errMsg = (error.errors && error.errors[0]?.message) || error.message
            // 未知异常
            ctx.body = {
                msg: errMsg,
                error_code: 99999,
                request: `${ctx.method}: ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError