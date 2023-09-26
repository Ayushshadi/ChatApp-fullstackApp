const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Message=sequelize.define('message',{
    message:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})

module.exports=Message;