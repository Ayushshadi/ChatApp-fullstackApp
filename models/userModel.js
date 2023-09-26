const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../utils/database');

const User = sequelize.define('User', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull:false,
    unique:true,
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false,
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
module.exports=User;