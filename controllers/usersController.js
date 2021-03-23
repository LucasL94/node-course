const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const usersController = (User) => {

  const postUser = async (req, res) => {
    try {
      const { body } = req
      const encryptedPassword = await bcrypt.hash(req.body.password, 10)
      const encryptedUser = {
        ...body,
        password: encryptedPassword
      }

      const user = new User(encryptedUser)

      await user.save()
      return res.status(201).json(user)
    } catch (err) {
      throw err
    }
  }

  const login = async (req, res) => {
    try {
      const { body } = req
      const { userName, password } = body

      const user = await User.findOne({
        userName: userName
      })

      if (user && checkPassword(user, password)) {
        return res.json({message: 'ok', token: generateToken(user)})
      } else {
        return res.json({message: 'Incorrect credentials'})
      }

    } catch (err) {
      throw err
    }
  }

  const checkPassword = async (user, password) => {
    return bcrypt.compare(password, user.password)
  }

  const generateToken = (user) => {
    return jwt.sign({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      address: user.address,
      phone: user.phone
    }, 'secret')
  }

  return {postUser, login}
}

module.exports = usersController

