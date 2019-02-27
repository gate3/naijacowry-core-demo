const successResponse = (responseObject, message = '', data = null) => {
  responseObject.json({
    status: true,
    message,
    data
  })
}

const errorResponse = (responseObject, errorObject) => {
  const message = errorObject.message ? errorObject.message : 'An error occurred'
  responseObject.json({
    status: false,
    message,
    data: errorObject
  })
}

module.exports = {
  successResponse,
  errorResponse
}
