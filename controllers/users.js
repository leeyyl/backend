const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = require('express').Router()

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

router.get('/', async (req, res) => {
    const users = await User.find({}).populate('notes', { content: 1, date: 1 })
    res.json(users)
})

module.exports = router