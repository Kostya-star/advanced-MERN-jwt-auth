const userService = require('../service/user-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-errors')

const registration = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error:', errors.array()))
    }
    const { email, password } = req.body
    const userData = await userService.registration(email, password)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(200).json(userData)
  } catch (error) {
    next(error)
  }
}
const login = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
const logout = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
const activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link
    await userService.activate(activationLink)
    res.redirect(process.env.CLIENT_URL)
  } catch (error) {
    next(error)
  }
}
const refreshToken = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
const getUsers = async (req, res, next) => {
  try {
    res.json(['sdf', 'aer'])
    
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registration,
  login,
  logout,
  activate,
  refreshToken,
  getUsers
}