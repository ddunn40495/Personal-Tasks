// =======================================
//              
//          EVENT CONTROLLER
//
// =======================================


// =========================
//       DEPENDENCIES
// =========================
const express = require('express')
const events = express.Router()
const Event = require('../models/event.js')

// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//       return next()
//     } else {
//       res.redirect('/sessions/new')
//     }
//   }

// =========================
//      ROUTES
// =========================

/* ===========
GET ROUTE
============= */
//NEW EVENT
events.get('/new', (req, res) => {
    const items = ['School', 'Friends', 'Family', 'Kids', 'Church', 'Sports', 'Doctor', 'Party', 'Night-Out']
    res.render('events/events_new.ejs',{
        items: items
    })
  })


/* ===========
POST ROUTE
============= */
//CREATE EVENT
events.post('/', async (req, res) => {
    try {
        const event = await Event.create(req.body)
        res.redirect('/events/' + event.id)
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
GET ROUTE
============= */
//INDEX EVENT
events.get('/', async (req, res) => {
   try {
       const events = await Event.find({})
       if (!events.length) {
           res.send('you have no events go make event <a href="/events/new">Make Event</a>')
       }
       res.render('events/events_index.ejs', {
           events: events
       })
   } catch (error) {
       res.send(err)
   }
    
  })

/* ===========
GET ROUTE
============= */
//SHOW EVENT
events.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
        res.render('events/events_show.ejs', {
            event: event
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
PUT ROUTE
============= */
//UPDATE EVENT
events.put('/:id',  (req, res) => {
    
         Event.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedEvent) => {
            res.redirect('/events/' + updatedEvent.id)
        })
       
 
  })


/* ===========
GET ROUTE
============= */
//EDIT EVENT
events.get('/:id/edit',  (req, res) => {
    const items = ['School', 'Friends', 'Family', 'Kids', 'Church', 'Sports', 'Doctor', 'Party', 'Night-Out']
    try {
        Event.findById(req.params.id, (err, foundEvent) => {
            res.render('events/events_edit.ejs', { 
                event: foundEvent,
                items: items
            })
        })
        
    } catch (error) {
        res.send(error)
        console.log(error)
    }
  })


/* ===========
DELETE ROUTE
============= */
//DELETE EVENT
events.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndRemove(req.params.id)
        res.redirect('/events')
    } catch (error) {
        res.send(error)
    }
  })

  module.exports = events

 