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
  username: {type: String, required: true},
  log: [{type: Schema.Types.ObjectId, ref: 'Exercise'}]
})

const exerciseSchema = new Schema({
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: {type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema)
const Exercise = mongoose.model('Excercise', exerciseSchema)

/**
 * TODO: POST to /api/users with form data username to create a new user.
 * JSON response: username and _id properties.
 */
app.post('/api/users', (req, res) => {
  async function createUser() {
    try {
      const username = req.body.username

      const user = new User({
        username: username
      })

      const saveUser = await user.save()

      return res.json({
        _id: saveUser._id,
        username: saveUser.username
      });
    } catch (error) {
      console.log(error)
      return res.json({error: error.message})
    }
  }

  createUser()
})

/**
 * TODO: GET request to /api/users to get an array of all users.
 * Each element in the array is an object containing a user's username and _id.
 */
app.get('/api/users', (req, res) => {
  async function getAllUsers() {
    try {
      const allUsers = await User.find({})
      .select({log: 0, __v: 0})
      .exec()

      return res.json(allUsers)
    } catch (error) {
      console.log(error)
      return res.json({error: error.message})
    }
  }

  getAllUsers()
})

/**
 * TODO: POST to /api/users/:_id/exercises with form data description, duration, and optionally date.
 * If no date is supplied, the current date will be used.
 * JSON response: user object with the exercise fields added.
 */
app.post('/api/users/:_id/exercises', (req, res) => {
  async function addExercise() {
    try {
      const id = req.params._id
      let { description, duration, date } = req.body

      /**
       * TODO: Change null to undefined
       * (Defaults do **not** run on null, '', or value other than undefined)
       * TODO: else, verify date format
       */
      if ( !date ) {
        date = undefined
      } else if ( !date.match(/^[0-9]{4}[-/][0-9]{2}[-/][0-9]{2}$/) ) {
        throw new Error('Invalid date format')
      }

      User.findByIdAndUpdate(id, {
        description: description,
        duration: duration,
        date: date
      }, (err, usr) => {
        if (err) console.log(err)
        else {
          return res.json({
            _id: usr._id,
            username: usr.username,
            description: usr.description,
            duration: usr.duration,
            date: new Date(usr.date).toDateString()
          })
        }
      })

    } catch (error) {
      console.log(error)
      return res.json({ error: error.message })
    }
  }

  addExercise()
})

/**
 * TODO: GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
 * JSON response: user object with a log array of all the exercises added.
 * Each log item has the description, duration, and date properties.
 */
app.get('/api/users/:_id/logs', (req, res) => {
  async function getLogs() {
    try {
      const id = req.params._id
      const { from, to, limit } = req.query
      const fromDate = new Date(from)
      const toDate = new Date(to)

      const user = await User.findById(id)
      .populate({
        path: 'log',
        match: from && to ? {date: {$gte: fromDate, $lte: toDate}}
        : from ? {date: {$gte: fromDate}}
        : to ? {date: {$lte: toDate}}
        : null,
        options: {limit: limit ? limit : null}
      })
      .exec()

      const result = {
        _id: user._id,
        username: user.username
      }

      if (from && to) {     
        result.from = fromDate.toDateString()
        result.to = toDate.toDateString()
      } else if (from) {
        result.from = fromDate.toDateString()
      } else if (to) {
        result.to = toDate.toDateString()
      }

      result.count = user.log.length

      result.log = user.log.map(i => {
        return {
          description: i.description,
          duration: i.duration,
          date: i.date.toDateString()
        }
      })

      return res.json(result)
    } catch (error) {
      console.log(error)
      return res.json({error: error.message})
    }
  }

  getLogs()
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
