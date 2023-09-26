const express = require('express');
const { getUserController } = require('../controllers/userController');

const router=express.Router()
router.get('/',getUserController)

module.exports=router;