// =======================================
//              
//          GOALS CONTROLLER
//
// =======================================


// =========================
//       DEPENDENCIES
// =========================
const express = require('express')
const goals = express.Router()
const Goal = require('../models/goal.js')
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
//NEW GOAL
goals.get('/new', (req, res) => {
    res.render('goals/goals_new.ejs')
  })


/* ===========
POST ROUTE
============= */
//CREATE GOAL
goals.post('/', async (req, res) => {
    try {
        const goal = await Goal.create(req.body)
        res.redirect('/goals/' + goal.id)
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
GET ROUTE
============= */
//INDEX GOAL
goals.get('/', async (req, res) => {
   try {
       const goals = await Goal.find({})
       if (!goals.length) {
           res.send('you have no goals go make Goal <a href="/goals/new">Make Goal</a>')
       }
       res.render('goals/goals_index.ejs', {
           goals: goals
       })
   } catch (error) {
       res.send(err)
   }
    
  })

/* ===========
GET ROUTE
============= */
//SHOW GOAL
goals.get('/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id)
        res.render('goals/goals_show.ejs', {
            goal: goal
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
PUT ROUTE
============= */
//UPDATE GOAL
goals.put('/:id', async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.redirect('/goals/' + goal.id )
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
GET ROUTE
============= */
//EDIT GOAL
goals.get('/:id/edit', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params)
        res.render('goals/goals_edit.ejs', {
            goal: goal
        })
    } catch (error) {
        res.send(error)
    }
  })


/* ===========
DELETE ROUTE
============= */
//DELETE GOAL
goals.delete('/:id', async (req, res) => {
    try {
        await Goal.findByIdAndRemove(req.params.id)
        res.redirect('/goals')
    } catch (error) {
        res.send(error)
    }
  })

  module.exports = goals

  