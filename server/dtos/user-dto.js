const createUserDTO = (user) => {
  return {
    email: user.email,
    id: user._id,
    isActivated: user.isActivated
  }
}

module.exports = createUserDTO