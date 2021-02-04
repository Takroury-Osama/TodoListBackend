const mongoose = require('mongoose')

let schema = mongoose.Schema;

let toDoItem = new schema({
  text: String,
  isArchived: Boolean
})

module.exports = mongoose.model('toDoItem', toDoItem)
