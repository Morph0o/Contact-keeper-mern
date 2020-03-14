const express = require('express')

const router = express.Router()


// route GETe api/auth
//desc  get logged in user
//access  private
router.get('/', (req, res)=> {
    res.send('register user')
})

// route POST api/auth
//desc  get logged in user
//access  private
router.get('/', (req, res)=> {
    res.send('register user')
})
module.exports.router