const express = require('express')
const api = express.Router()

const authRoutes = require('../auth/routes')

api.use(authRoutes)

module.exports = api
