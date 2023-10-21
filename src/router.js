const express = require('express')

const jwt = require('jsonwebtoken')

const controllerTarefa = require('./controllers/tarefaController')
const controllerUser = require('./controllers/userController')

const routes = express.Router()

//public
routes.post('/auth/registro', controllerUser.registro)

routes.post('/auth/entrar', controllerUser.entrar)

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Acesso negado." })
    }

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()
    } catch (error) {
        return res.status(400).json({ error: error })
    }
}

//private
routes.get('/', checkToken, controllerTarefa.listar)

routes.post('/novo', checkToken, controllerTarefa.novo)

routes.patch('/editar/:id', checkToken, controllerTarefa.editar)

routes.get('/buscar/:id', checkToken, controllerTarefa.buscar)

routes.delete('/apagar/:id', checkToken, controllerTarefa.apagar)

module.exports = routes