const express = require('express')

const jwt = require('jsonwebtoken')

const controllerTarefa = require('./controllers/tarefaController')
const controllerUser = require('./controllers/userController')
const User = require('./models/user')

const routes = express.Router()

//public routes
routes.post('/auth/registro', controllerUser.registro)
routes.post('/auth/entrar', controllerUser.entrar)
routes.post('/auth/sair', controllerUser.sair)

//middleware
function checkToken(req, res, next) {
    //const authHeader = req.headers['authorization']
    //const token = authHeader && authHeader.split(' ')[1]

    const token = req.cookies['jwt']

    if (!token) {
        return res.status(401).json({ message: "Usuario não autenticado." })
    }

    const secret = process.env.SECRET
    const claims = jwt.verify(token, secret)

    if(!claims) {
        return res.status(401).json({
            error: true,
            message: "Token invalid/expired"
        })
    } 

    return next()
}


//private routes
routes.get('/', checkToken, controllerTarefa.listar)

routes.post('/novo', checkToken, controllerTarefa.novo)

routes.patch('/editar/:id', checkToken, controllerTarefa.editar)

routes.get('/buscar/:id', checkToken, controllerTarefa.buscar)

routes.delete('/apagar/:id', checkToken, controllerTarefa.apagar)

module.exports = routes