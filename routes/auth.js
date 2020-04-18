const express = require('express')

const router = express.Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth')


// route GET api/auth
//desc  get logged in user
//access  private
router.get('/',auth, async (req, res)=> {
    try {
        const user = await (await User.findById(res.user.id)).select('-password')
        return res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// route POST api/auth
//desc  auth user and get token
//access  public
router.post('/',[
    check('email','Please enter valid email').isEmail(),
    check('password','Password is required').exists()
], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email,password} = req.body
    try {
        let user = await User.findOne({email})
       
        if(!user) {
            return res.status(400).json({msg:'invalid credentials'})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"invalid credentials"})
        }
        console.log("auth")
        const payload = {
            user: {
                id: user.id
            } 
        }
        jwt.sign(payload, config.get('jwtsecret'),{
        expiresIn: 360000
            },(err, token)=>{
                if(err) throw err;
                res.json({token})
                
                
            })
            console.log("jwtsign ")
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router