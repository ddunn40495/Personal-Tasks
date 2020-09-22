const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goalSchema = new Schema({
    name: {type: String, required: true},
    targetDate: {type: Date, required: true},
    category: {type: String, required: true}
}, {timestamps:true})

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal