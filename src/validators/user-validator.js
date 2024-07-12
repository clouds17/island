// const {
//     Rule,
//     LinValidator
// } = require('../core/lin-validator')

const Joi = require('joi')
const { ParameterException } = require('../core/http-exception')

const RegisterValidator = async (body) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

        repassword: Joi.ref('password'),
        nickname: Joi.string().min(1).max(10).required().messages({
            "string.empty": "用户名必填",
            "any.required": "用户名必填",
            "string.max": "用户名长度不能超过 10",
          })
    })

    const result = schema.validate(body)
    if (result.error) {
        throw new ParameterException(result.error.details[0].message)
    }
    return result

}

module.exports = {
    RegisterValidator
}