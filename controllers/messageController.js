const { Op } = require("sequelize");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Group = require("../models/groupModel");

module.exports.postSendMessageController=async(req,res)=>{
    console.log(req.body);
    const {message,tokenObj,groupId}=req.body;
    const result=await User.findOne({where:{
        id:tokenObj.id
    }})
    let data;
    if(result){
        data=await Message.create({message,senderId:tokenObj.id,groupId})
        // bug in the message route => kabhi kabhi message ko dave karne par groupId undefined save ho rhi hai database me to resolve it  
        res.json({message:'message receive',data})
    }
    else
        res.json({message:"User does not exist",status:401})
}

module.exports.getMessageController=async(req,res)=>{
    let {id,groupId}=req.query;
    if(id===undefined)
        id=0;
    const data = await Message.findAll({
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Group,
                attributes: ['id','groupname'],
                where:{
                    id:groupId
                }
            }
        ],
        attributes: ['id','message', ],
        order: [['createdAt', 'ASC']],
        where:{
            id: {
                [Op.gte]: id,
              },
        }
    });
    res.json({message:"all chats send",data});
}