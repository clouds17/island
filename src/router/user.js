const Router = require('koa-router')
const router = new Router()

const { HttpException } = require('../core/http-exception')
const { RegisterValidator } = require('../validators/user-validator')
const { User } = require('../models/user')
const { successModel } = require('../lib/sucess-model')


router.prefix('/api/user')

router.post('/register', async (ctx) => {

    const parameter = await RegisterValidator(ctx.request.body)
    let user = await User.create(parameter.value)
 
    if (user?.dataValues?.password) {
        delete user.dataValues.password
    }
    successModel('创建成功', user)
})

router.post('/query', async (ctx) => {
    let users = await User.findAll()
    let result = []
    users.forEach(user => {
        let obj = user.dataValues
        delete obj.password
        result.push(obj)
    })

    successModel('获取成功', result)
})


module.exports = router