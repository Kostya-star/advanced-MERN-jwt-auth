const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const createUserDTO = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-errors')

const registration = async (email, password) => {
  const candidate = await UserModel.findOne({ email })
  if (candidate) {
    throw ApiError.BadRequest(`Email ${email} is already registered`)
  }
  const hashedPassword = await bcrypt.hash(password, 3)
  const activationLink = uuid.v4()

  const user = await UserModel.create({ email, password: hashedPassword, activationLink })
  await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

  const userDto = createUserDTO(user)
  const tokens = tokenService.generateTokens({ ...userDto })
  await tokenService.saveToken(userDto.id, tokens.refreshToken)

  return { ...tokens, user: userDto }
}

const activate = async (activationLink) => {
  const user = await UserModel.findOne({ activationLink })
  if(!user) {
    throw ApiError.BadRequest('Wrong activation link')
  }
  user.isActivated = true
  await user.save()
}

module.exports = {
  registration,
  activate
}