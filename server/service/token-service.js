const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign(payload, process.env.JWR_REFRESH_SECRET, { expiresIn: '30d' })

  return {
    accessToken,
    refreshToken
  }
}

const saveToken = async (userId, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userId })
  if(tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }
  const token = await tokenModel.create({ user: userId, refreshToken })
  return token
}

module.exports = {
  generateTokens,
  saveToken
}