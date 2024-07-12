const Router = require('koa-router')
const router = new Router()
const { Auth } = require('../middlewares/auth')
router.prefix('/api/book')

router.post('/', new Auth().check, async (ctx) => {
    ctx.body = 'book路由'
})

module.exports = router