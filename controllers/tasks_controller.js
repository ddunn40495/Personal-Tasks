// =======================================
//              
//          TASKS CONTROLLER
//
// =======================================


// =========================
//       DEPENDENCIES
// =========================
const express = require('express')
const tasks = express.Router()
const Task = require('../models/task.js')
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
//NEW tasks
tasks.get('/new', (req, res) => {
    res.render('tasks/tasks_new.ejs')
  })


/* ===========
POST ROUTE
============= */
//CREATE tasks
tasks.post('/', async (req, res) => {
    try {
        const tasks = await Task.create(req.body)
        res.redirect('/tasks/' + tasks.id, {
            tasks: tasks
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
GET ROUTE
============= */
//INDEX tasks
tasks.get('/', async (req, res) => {
   try {
       const tasks = await Task.find({})
       if (!tasks.length) {
           res.send('you have no tasks go make tasks <a href="/tasks/new">Make tasks</a>')
       }
       res.render('tasks/tasks_index.ejs', {
           tasks: tasks
       })
   } catch (error) {
       res.send(err)
   }
    
  })

/* ===========
GET ROUTE
============= */
//SHOW tasks
tasks.get('/:id', async (req, res) => {
    try {
        const tasks = await Task.findById(req.params.id)
        res.render('tasks/tasks_show.ejs', {
            tasks: tasks
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
PUT ROUTE
============= */
//UPDATE tasks
tasks.put('/:id', async (req, res) => {
    try {
        const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.redirect('/tasks/' + tasks.id )
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
GET ROUTE
============= */
//EDIT tasks
tasks.get('/:id/edit', async (req, res) => {
    try {
        const tasks = await Task.findById(req.params)
        res.render('tasks/tasks_edit.ejs', {
            tasks: tasks
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
DELETE ROUTE
============= */
//DELETE tasks
tasks.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id)
        res.redirect('/tasks')
    } catch (error) {
        res.send(error)
    }
  })

  module.exports = tasks

  