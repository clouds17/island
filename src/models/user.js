const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')
const {sequelize} = require('../core/db')
const { AuthFailedException } = require('../core/http-exception')

class User extends Model {
    static async verifyEmailPassword(email, password) {
        let user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new AuthFailedException('账号不存在')
        }

        // 判断密码
        const correct = bcrypt.compareSync(password, user.password)
        if (!correct) {
            throw new AuthFailedException('密码不正确')
        }
        if (user?.dataValues?.password) {
            delete user.dataValues.password
        }
        return user

    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, salt)
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}