const { SuccessException } = require('../core/http-exception')

function successModel(msg, data) {
    throw new SuccessException(msg, data)
}

module.exports = {
    successModel
}