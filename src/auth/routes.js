const express = require('express')
const api = express.Router()
const aw = require('../../initAwilix')
const container = aw.container
const responseHelper = require('../util/response.helper')

api.post('/user/create', async (req, res) => {
  try {
    container.resolve('signupCtrl')(req.body)
    console.log(data)
    return responseHelper.successResponse(res, '', data)
  } catch (e) {
    console.log(e)
    return responseHelper.errorResponse(res, e)
  }
})

module.exports = api
