const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const InitManager = require('./src/core/init')
const catchError = require('./src/middlewares/exception')
// const user = require('./src/router/user')

console.log('NODE_ENV', process.env.NODE_ENV)


const app = new Koa()

app.use(catchError)

app.use(bodyParser())
InitManager.initCore(app)

// app.use(user.routes())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})