const { Router } = require('express')
const controller = require('../controllers/controllers')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

const router = Router()

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  controller.registration)

router.post('/login', controller.login)

router.post('/logout', controller.logout)

router.get('/activate/:link', controller.activate)

router.get('/refresh', controller.refresh)

router.get('/users', authMiddleware, controller.getUsers)

module.exports = router