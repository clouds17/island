const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRoutes()
        InitManager.initLoadConfig()
    }

    static initLoadConfig() {
        const path = process.cwd() + '/src/config/config'
        const config = require(path)
        globalThis.config = config
    }

    static initLoadRoutes() {
        const routeDirectory = `${process.cwd()}/src/router`
        requireDirectory(module, routeDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }

    }
}

module.exports = InitManager