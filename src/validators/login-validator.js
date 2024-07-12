const Joi = require('joi')
const { loginType } = require('../lib/enum')
const { ParameterException } = require('../core/http-exception')

const LoginValidator = (body) => {
    const schema = Joi.object({
        type: Joi.number().valid(...Object.values(loginType)).required(),
        account: Joi.when('type', {
            is: loginType.emailLogin,
            then: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        }).when('type', {
            is: loginType.phoneLogin,
            then: Joi.string().pattern(/^1[3-9]\d{9}$/).required()
        }),
        code: Joi.when('type', {
            is: loginType.wxLogin,
            then: Joi.string().required()
        }),
        password: Joi.when('type', {
            is: Joi.number().valid(loginType.emailLogin, loginType.phoneLogin),
            then: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).required()
        })
    })
    const result = schema.validate(body)
    if (result.error) {
        throw new ParameterException(result.error.details[0].message)
    }
    return result
}

// emailLogin: {
//     type: 100,
//     account: '990695619@qq.com',
//     password: 'a123456'
// }

// phoneLogin: {
//     type: 102,
//     account: '18450130331',
//     password: 'a123456'
// }

// wxLogin: {
//     type: 102,
//     code: 'afwqfgqwg'
// }

module.exports = {
    LoginValidator
}