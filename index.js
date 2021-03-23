const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Book = require('./models/bookModel')
const User = require('./models/userModel')
const bookRouter = require('./routes/bookRouter')(Book)
const userRouter = require('./routes/userRouter')(User)

const app = express()
mongoose.connect('mongodb://localhost/bookAPI', {useNewUrlParser: true})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', bookRouter)
app.use('/api', userRouter)

const port = 8080

app.listen(port, () => {
  console.log(`server started on port: ${port}`)
})
