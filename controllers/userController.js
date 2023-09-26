const { Op } = require("sequelize");
const User = require("../models/userModel");

module.exports.getUserController=async(req,res)=>{
    console.log(req.query);
    const { count, rows } = await User.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`
          }
        },
        attributes:['id','name'],
        offset: 0,
        limit: 10
      });
      console.log(count);
      console.log(rows);
    res.send({message:'hello get user controller',data:rows})
}