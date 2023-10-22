const express = require('express')
const api = express()
const routes = require('./router')
const cors = require('cors')
const cookieParser = require('cookie-parser')

api.use(express.json())

api.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

api.use(cookieParser())

api.use(routes)

api.listen(4000)