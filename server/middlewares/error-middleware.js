const ApiError = require('../exceptions/api-errors')

module.exports = (err, req, res, next) => {
  console.log(err);

  if(err instanceof Error) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Some unexpected error occured' })
}