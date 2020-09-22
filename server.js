// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();



// =======================================
//              MIDDLEWARE
// =======================================
require('dotenv').config()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));  
app.use(methodOverride('_method'));
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// )


// =======================================
//              DATABASE
// =======================================
const port = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection
const dbName = process.env.DBNAME



// =======================================
//      MONGOOSE CONNECTION LOGIC
// =======================================
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false }, () => {
	console.log('the connection with mongod is established')
})
db.once('open', ()=> {
  console.log('mongo connected: ', dbName);
});
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));
// =======================================
//          CONTROLLERS
// =======================================
const eventsController = require('./controllers/events_controller.js')
app.use('/events', eventsController)
const goalsController = require('./controllers/goals_controller.js')
app.use('/goals', goalsController)
const tasksController = require('./controllers/tasks_controller.js')
app.use('/tasks', tasksController)


// =======================================
//              ROUTES
// =======================================


/* ===========
GET ROUTE
============= */
//DASH
app.get('/', (req, res) => {
    res.send('<a href="/events">Events</a>')
})






// =======================================
//              LISTENER
// =======================================
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});