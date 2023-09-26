const express = require('express'); 
const { postLoginController } = require('../controllers/loginController');
const router = express.Router()

router.post('/',postLoginController)

module.exports=router;