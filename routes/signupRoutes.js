const express = require('express'); 
const router=express.Router()

const {postSignupController} = require('../controllers/signupController');

router.post('/',postSignupController)

module.exports=router;