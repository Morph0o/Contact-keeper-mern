const express = require('express')
const rounter = express.Router()
const auth = require('../middleware/auth')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = express.Router()
// route GET api/contacts
//desc  get all contacts for user
//access  private
router.get('/',auth, async (req, res)=> {
    try {
        const contacts = await Contact.find({user: res.user.id}).sort({date:-1})
        res.json(contacts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// route POST api/contacts
//desc  add new contact
//access  private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
]],async (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {name, email, phone, type} = req.body
    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })
        const contact = await newContact.save()
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
        
    }
})

// route PUT api/contacts/:id
//desc  updates
//access  private
router.put('/:id',auth,async (req, res)=> {
    const {name, email, phone, type} = req.body
    const contactFields = {}
    if(name) contactFields.name = name
    if(email) contactFields.email = email
    if(phone) contactFields.phone = phone
    if(type) contactFields.type = type
    try {
        let contact= await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({msg:'Contact not found'})
        if(contact.user.toString() !== res.user.id ){
            return res.status(401).json({msg:'Not Autherized'})
        }
        contact = await Contact.findByIdAndUpdate(req.params.id, 
            { $set: contactFields },
            {new: true})
            res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})
// route DELETE api/contacts/:id
//desc  delete contacts
//access  private
router.delete('/:id',auth, async (req, res)=> {
    try {
        let contact= await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({msg:'Contact not found'})
        if(contact.user.toString() !== res.user.id ){
            return res.status(401).json({msg:'Not Autherized'})
        }
        await Contact.findbyIdAndRemove(req.params.id)
            res.json({msg:'Contact removed'})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router