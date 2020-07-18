const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const { findOneAndUpdate } = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const jwt = require('jsonwebtoken')
const auth = require('../src/middleware/auth')



const app = express()
const port = process.env.PORT 



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// const tok = async () => {
//   const token = await jwt.sign('ajey nagar','yomama')
//   console.log(token)
// }
// tok()

// const pass = async () => {
//   const p = 'red123'
//   const hashedd = await bcrypt.hash(p,8)
//   const r = await bcrypt.compare('red123',hashedd)
//   console.log(r)
// }

// pass()


// const yo = async () => {
//   const task = await Task.findById('5f01f89e95c5251d3801f080')
//   // await task.populate('owner').execPopulate()
//   console.log(task)
// }
// yo()

app.listen(port,() => {
  console.log('server is up on port ' + port)
})