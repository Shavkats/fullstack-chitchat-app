const express = require('express')
const dotenv = require('dotenv') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const users = require('./routes/users')
const posts = require('./routes/posts')

// Setup environment
dotenv.config()

//Connect to database
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const app = express()

//Body parser and cors middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//Passport middleware
app.use(passport.initialize())

//Passport config
require('./config/passport')(passport)

//Routes
app.use('/api/users', users)
app.use('/api/posts', posts)

//Start app
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))