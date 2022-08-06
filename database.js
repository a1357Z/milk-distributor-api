const mongoose = require('mongoose')
const { refillMilk } = require('./common')
mongoose.connect('mongodb://localhost:27017/milkDistributor', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'error connecting to the database'))
db.once('open', () => {
    console.log('connected to the database');
    refillMilk();
})

module.exports = db