const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = require('express').Router()
coust User = require('../models/user')

router.post('/', async (req, res) => {
    const body = req.body

    const salt = 10
    const hash = await bcrypt.hash(body.password, salt)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: hash
    })

    const saved = await user.save()

    res.json(saved)
})

module.exports = router