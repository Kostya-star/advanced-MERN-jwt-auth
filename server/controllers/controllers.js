const userService = require('../service/user-service')

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const userData = await userService.registration(email, password)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(200).json(userData)
  } catch (error) {
    console.log(error)
  }
}
const login = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}
const logout = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}
const activate = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}
const refreshToken = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}
const getUsers = async (req, res, next) => {
  try {
    res.json(['sdf', 'aer'])
    
  } catch (error) {
    
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