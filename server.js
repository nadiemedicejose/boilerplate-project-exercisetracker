const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
