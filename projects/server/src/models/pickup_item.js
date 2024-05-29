"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pickup_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pickup_Item.hasMany(models.Pickup_Report);
      Pickup_Item.hasMany(models.Return_Report);
      Pickup_Item.belongsTo(models.Item);
      Pickup_Item.belongsTo(models.Pickup);
    }
  }
  Pickup_Item.init(
    {
      qty_stock: DataTypes.INTEGER,
      qty_taken: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pickup_Item",
    }
  );
  return Pickup_Item;
};
