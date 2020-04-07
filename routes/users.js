const express = require('express')

const router = express.Router()
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

// route POST api/users
//desc   register user
//access  public
router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','please enter valid email').isEmail(),
    check('password','please enter a password with 6 or more char').isLength({min:6})
],
     async (req, res)=> {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, password} = req.body
    
    try{
        let user = await User.findOne({email: email})
        
        if(user){
            res.status(404).json({msg:"user already exists"})

        }
        user = new User({
            name,
            email,
            password
        })
        
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()
       
        const payload = {
            user: {
                id: user.id
            } 
        }
            jwt.sign(payload, config.get('jwtsecret'),{
                expiresIn: 360000
            },(err, token)=>{
                if(err) throw err;
                res.json()
                
            })
        
    }catch(err){
        console.error(err.message)
        res.status(500).json({msg: "Server error"})
    }
})


module.exports = router