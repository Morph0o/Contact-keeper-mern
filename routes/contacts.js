// route GET api/contacts
//desc  get all contacts for user
//access  private
router.get('/', (req, res)=> {
    res.send('get all contacts')
})

// route POST api/contacts
//desc  add new contact
//access  private
router.post('/', (req, res)=> {
    res.send('add contact')
})

// route PUT api/contacts
//desc  updates
//access  private
router.put('/:id', (req, res)=> {
    res.send('update contacts')
})
// route DELETE api/contacts
//desc  delete contacts
//access  private
router.delete('/:id', (req, res)=> {
    res.send('delete contacts')
})

module.exports.router