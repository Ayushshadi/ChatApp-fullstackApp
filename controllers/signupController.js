const User = require("../models/userModel");
const {encryptPassword} = require("../utils/passwordUtils");
const {checkUser} = require("../utils/userUtils");


module.exports.postSignupController = async (req, res) => {
    try {
        req.body.password = await encryptPassword(req.body.password);
        const checkExistingUser=await checkUser(req.body.email,req.body.phone)
        if (!checkExistingUser) {
            const result = await User.create(req.body)
            res.status(201).json({ message: 'User created successfully' });
        }
        else{
            res.json({message:"user already exists",status:409,statusText:"conflict"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }
}