const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const content = process.argv[3]
const important = process.argv[4]

const url = `mongodb+srv://lee:${password}@cluster0.syuc4.mongodb.net/fullstack?ssl=true&authSource=admin`
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const schema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', schema)

const note = new Note({
  content,
  date: new Date(),
  important,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     })
//     mongoose.connection.close()
// })
