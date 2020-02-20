'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    name: DataTypes.STRING
  }, {});
  Rooms.associate = function(models) {
    // associations can be defined here
  };
  return Rooms;
};