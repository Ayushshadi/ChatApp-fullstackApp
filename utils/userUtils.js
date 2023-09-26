const { Op } = require("sequelize");
const User = require("../models/userModel");
let checkExistingUser = true;
module.exports.checkUser =async (email,phone) => {
    const result=await User.findOne({
        where: {
            [Op.or]: [
                { email: email },
                { phone: phone }
            ]
        }
    })
    return result?true:false;
}