"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Return_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Return_Report.belongsTo(models.Pickup_Item);
      Return_Report.belongsTo(models.Report);
      Return_Report.belongsTo(models.Return);
    }
  }
  Return_Report.init(
    {
      qty_return: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Return_Report",
    }
  );
  return Return_Report;
};
