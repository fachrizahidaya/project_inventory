"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pickup_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pickup_Report.belongsTo(models.Pickup_Item);
      Pickup_Report.belongsTo(models.Pickup);
      Pickup_Report.belongsTo(models.Report);
    }
  }
  Pickup_Report.init(
    {
      qty_used: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pickup_Report",
    }
  );
  return Pickup_Report;
};
