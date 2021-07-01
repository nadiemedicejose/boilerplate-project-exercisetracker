const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Database setup
const mongoose = require('mongoose')
const db_uri = process.env.DB_URI
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })

// Schema and model
const { Schema } = mongoose
const userSchema = new Schema({
  username: {type: String, required: true}
})

const User = mongoose.model('User', userSchema)

/**
 * TODO: POST to /api/users with form data username to create a new user.
 * JSON response: username and _id properties.
 */
app.post('/api/users', (req, res) => {
  const username = req.body.username

  let user = new User({
    username: username
  })

  user.save((err, usr) => {
    if (err) return console.error(err)
    else {
      res.json({
        username: usr.username,
        _id: usr._id
      })
    }
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
