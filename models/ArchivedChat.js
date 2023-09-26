const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const ArchivedChat=sequelize.define('archieve-chat',{
    message:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})

module.exports=ArchivedChat;