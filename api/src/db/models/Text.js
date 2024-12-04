const mongoose = require('mongoose')
const Schema = mongoose.Schema

const textSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["main", "about", "games", "teamHeader", "team", "donate"],
  }
})

const Text = mongoose.model('Text', textSchema)
module.exports = Text