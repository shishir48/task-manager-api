const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./user')


const userSchema = new mongoose.Schema({
  description: {
    type: String,
    trim:true,
    required:true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }

  },{
    timestamps:true
  })



const Tasks = mongoose.model('Tasks',userSchema)

  module.exports = Tasks