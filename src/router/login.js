const Router = require('koa-router')
const router = new Router()
const { successModel } = require('../lib/sucess-model')
const { LoginValidator } = require('../validators/login-validator')
const { loginType, userRole } = require('../lib/enum')
const { User } = require('../models/user')
const { generateToken } = require('../core/util')

router.prefix('/api/login')

router.post('/', async (ctx) => {
    const parameter = LoginValidator(ctx.request.body)

    switch (parameter.value.type) {
        case loginType.emailLogin:
            // 邮箱密码登录
            const user = await User.verifyEmailPassword(parameter.value.account, parameter.value.password)
            const token = generateToken(user.id, userRole.admin)

            successModel('登录成功', {
                user,
                token
            })
            break;
    
        default:
            break;
    }

    console.log('parameter', parameter)
})


module.exports = router