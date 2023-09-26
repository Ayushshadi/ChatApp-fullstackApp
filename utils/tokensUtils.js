const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//const Group = require("../models/groupModel");

module.exports.generateToken = (id, email) => {
    console.log(id);
    console.log(email);
    return jwt.sign({ id: id, email: email }, 'AyushShadi')
}
module.exports.verifyToken = (req, res, next) => {
    const token = req.headers?.authorization;
    req.body.tokenObj = jwt.verify(token,'AyushShadi')
    next();
}

module.exports.verifyUser = async (req, res, next) => {
    const { tokenObj } = req.body;
    const result = await User.findOne({
        where: {
            id: tokenObj.id
        }
    })
    if (result)
        next();
    else
        res.json({ message: "User does not exist", status: 401 })
}

module.exports.checkAdmin = async (req, res, next) => {
    const { tokenObj } = req.body;
    const { groupId } = req.query;
    const groupData = await Group.findByPk(groupId);
    console.log(groupData);
    if (groupData) {
        const check=await groupData.hasAdmin({where:{id:tokenObj.id}});
        if(check)
            next();
        else
            res.json({message:'You are not an Admin'});
    }
    else res.json({ message: 'something went wrong' });
}