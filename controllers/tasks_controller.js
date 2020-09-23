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
//NEW TASKS
tasks.get('/new', (req, res) => {
    res.render('tasks/tasks_new.ejs')
  })


/* ===========
POST ROUTE
============= */
//CREATE TASKS
tasks.post('/', async (req, res) => {
    if(req.body.completed === 'on'){ 
    req.body.completed = true;
} else { 
    req.body.completed = false;
}
    try {
        const tasks = await Task.create(req.body)
        res.redirect('/tasks')
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
GET ROUTE
============= */
//INDEX TASKS
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
//SHOW TASKS
tasks.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.render('tasks/tasks_show.ejs', {
            task: task
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
PUT ROUTE
============= */
//UPDATE TASKS
tasks.put('/:id', async (req, res) => {
    try {
        const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.redirect('/tasks')
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
GET ROUTE
============= */
//EDIT TASKS
tasks.get('/:id/edit', async (req, res) => {
    if(req.body.completed === 'on'){ 
        req.body.completed = true;
    } else { 
        req.body.completed = false;
    }
    try {
        const task = await Task.findById(req.params.id)
        res.render('tasks/tasks_edit.ejs', {
            task: task
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
DELETE ROUTE
============= */
//DELETE TASKS
tasks.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id)
        res.redirect('/tasks')
    } catch (error) {
        res.send(error)
    }
  })

  module.exports = tasks

  