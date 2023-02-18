const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10m' })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '10d' })

  return {
    accessToken,
    refreshToken
  }
}

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return userData
  } catch (error) {
    return null
  }
}

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return userData
  } catch (error) {
    return null
  }
}

const saveToken = async (userId, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userId })
  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }
  const token = await tokenModel.create({ user: userId, refreshToken })
  return token
}

const removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken })
  return tokenData
}

const findToken = async (refreshToken) => {
  const tokenData = await tokenModel.findOne({ refreshToken })
  return tokenData
}

module.exports = {
  generateTokens,
  saveToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findToken
}