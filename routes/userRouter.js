const express = require('express')
const usersController = require('../controllers/usersController')

const routes = (User) => {
  const userRouter = express.Router()
  const controller = usersController(User)
  userRouter.route('/users')
    .post(controller.postUser)

    userRouter.route('/login')
    .post(controller.login)

  return userRouter
}

module.exports = routes
