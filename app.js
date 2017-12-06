const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const mongoose = require('mongoose');
const config = require('./config/database')

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
})

// On error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
})

const app = express();

// External route files
const users = require('./routes/users');
const notes = require('./routes/notes');
const tasks = require('./routes/tasks');

// Port number (specific for Heroku use)
const port = process.env.PORT || 8080;

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/notes', notes);
app.use('/tasks', tasks);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
app.listen(port, () => {
  console.log('Server started on port ', + port);
})
