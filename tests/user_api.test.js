const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('initial one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('create a fresh user', async () => {
    let users = await User.find({})
    const start = users.map(u => u.toJSON())

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    users = await User.find({})
    const end = users.map(u => u.toJSON())
    expect(end).toHaveLength(start.length +1)

    const names = end.map(u => u.username)
    expect(names).toContain(newUser.username)
  })
})