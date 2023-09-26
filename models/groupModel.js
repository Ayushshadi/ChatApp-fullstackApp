const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Group=sequelize.define('group',{
    groupname:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    createdBy:{
        type:DataTypes.BIGINT,
        allowNull:false,
    }
})

module.exports=Group;