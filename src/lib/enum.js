const loginType = {
    emailLogin: 100,
    wxLogin: 101,
    phoneLogin: 102
}

const userRole = {
    readUser: 4,
    normalUser: 8,
    admin: 16,
    superAdmin: 32
}

module.exports = {
    loginType,
    userRole
}