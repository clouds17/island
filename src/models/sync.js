const {sequelize} = require('../core/db')

const { User } = require('./user')
sequelize.authenticate().then(() => {
    console.log('sequelize连接成功')
}).catch(error => {
    console.log('sequelize连接失败', error)
})



// 强制更新
sequelize.sync({ force: true }).then(() => {
    process.exit()
})

// User.create( {
//     email: '91823u1984',
//     password: '1231243',
//     nickname: 'jisajfi'
// })