const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const correct = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
  if (!(user && correct)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const info = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(info, process.env.SECRET)
  console.log(token)
  const decode = jwt.verify(token, process.env.SECRET)
  console.log(decode)

  res.status(200).send({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = router