const express = require('express')
const {register, login, getUser} = require('../controllers/auth-controller.js')
const router = express.Router()


//Register route
router.post('/register',register)


//Login route
router.post('/login', login)

router.get('/users/:id', getUser)

module.exports = router;