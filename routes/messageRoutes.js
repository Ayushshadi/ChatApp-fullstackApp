const express = require('express');
const { postSendMessageController,getMessageController} = require('../controllers/messageController');
const { verifyToken } = require('../utils/tokensUtils');
const router=express.Router()
router.post('/',verifyToken,postSendMessageController); //task incompleted= verifyToken
router.get('/chats/',verifyToken,getMessageController); //task incompleted= verifyToken
module.exports=router;