const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tasks = require('./task')


  const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true 
  },
  age: {
    type: Number,
    required: true,
    validate(value){
      if(value<1){
        throw new Error ('age must be greater than 0')
      }
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('please enter a valid email')
      }
    }
    },
    password:{
      type:String,
      required: true,
      trim:true,
      minlength:7,
      validate(value){
        if(value.includes('password') ){
          throw new Error('enter a valid password!')
        }
      }
    },
    tokens:[{
      token:{
        type:String,
        required: true
      }
    }],
    avatar:{
      type:Buffer
    }
  },
  {
    timestamps:true
  })

userSchema.virtual('tasks',{
  ref: 'Tasks',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function(){
  const user = this
  const userObj = user.toObject()
  delete userObj.password
  delete userObj.tokens
  delete userObj.avatar
  return userObj
}

userSchema.methods.generateToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email,password) => {
  const user = await User.findOne({email})
  if(!user){
    throw new Error('unable to login')
  }
  const pass = await bcrypt.compare(password,user.password)
  if(!pass){
    throw new Error('unable to login')
  }
  return user
}

userSchema.pre('remove', async function(){
  const user = this
  await Tasks.deleteMany({owner:user._id})
  next()
})


userSchema.pre('save',async function(next){
  const user = this
  if(user.isModified('password')){
  user.password = await bcrypt.hash(user.password,8)    
  }
  next()
})

const User = mongoose.model('User',userSchema)

  module.exports = User