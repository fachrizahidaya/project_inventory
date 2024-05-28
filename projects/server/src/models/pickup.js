"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pickup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pickup.hasOne(models.Report);
      Pickup.hasMany(models.Pickup_Item);
      Pickup.hasMany(models.Pickup_Report);
    }
  }
  Pickup.init(
    {},
    {
      sequelize,
      modelName: "Pickup",
    }
  );
  return Pickup;
};
