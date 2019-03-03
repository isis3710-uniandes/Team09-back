'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    sessionId: {type:DataTypes.INTEGER, primaryKey:true},
    userId: {type:DataTypes.INTEGER, references: 'users', referencesKey: 'userID'},
    startTime:DataTypes.DATE,
    endTime:DataTpes.DATE
  }, {timestamps: false});

  return Sessions;
};