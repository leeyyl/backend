const mongoose = require('mongoose')
const supertest = require('supertest')
const Note = require('../models/note')
const app = require('../app')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
]

beforeEach(async () => {
  await Note.deleteMany({})
  console.log('clear')
  const models = initialNotes.map(note => new Note(note))
  const arr = models.map(note => note.save())
  await Promise.all(arr)
  console.log('done')
})

test('notes are returned as json', async () => {
  console.log('enter json')
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('notes number', async () => {
  console.log('enter number')
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})

test('a specific note within returned notes', async () => {
  console.log('enter specific')
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note.content)
  expect(contents).toContain('Browser can execute only Javascript')
})

afterAll(() => mongoose.connection.close())