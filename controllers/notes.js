const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

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
  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }
  const user = await User.findById(body.userId)
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
