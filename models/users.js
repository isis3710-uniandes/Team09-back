'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userID: {type:DataTypes.INTEGER, primaryKey:true},
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePicturePath: DataTypes.STRING
  }, {timestamps: false});

  return Users;
};