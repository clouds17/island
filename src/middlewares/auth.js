const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { ForbbidenException } = require('../core/http-exception')

class Auth {
    constructor(level) {
        this.level = level || 1
    }

    get check() {
        return async (ctx, next) => {
            console.log('ctx.req', ctx.req)
            const userToken = basicAuth(ctx.req)
            let errMsg = 'token不合法'

            if (!userToken || !userToken.name) {
                throw new ForbbidenException(errMsg)
            }
            let decode = null
            try {
                decode = jwt.verify(userToken.name, globalThis.config.security.secretKey)
            } catch(error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new ForbbidenException(errMsg)
            }

            if (decode.scope < this.level) {
                errMsg = '权限不足'
                throw new ForbbidenException(errMsg)
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = {
    Auth
}