const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { info } = require('../utils/logger')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  // info(authorization)
  if (authorization) {
    return authorization.split(' ')[1]
  }
  return null
}

router.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  res.json(notes)
})

router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const note = await Note.findByIdAndRemove(req.params.id)
  console.log(note)
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const { body } = req
  const note = await Note.findByIdAndUpdate(req.params.id, body, {
    new: true,
  })
  console.log(note)
  res.json(note)
})

router.post('/', async (req, res) => {
  const { body } = req

  const token = getTokenFrom(req)
  info(token)
  info(process.env.SECRET)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })
  const result = await note.save()
  user.notes = user.notes.concat(result._id)
  await user.save()
  res.json(result)
})

module.exports = router
