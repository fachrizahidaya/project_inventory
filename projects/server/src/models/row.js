"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Row extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Row.hasMany(models.Item);
      Row.belongsTo(models.Rack);
    }
  }
  Row.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Row",
    }
  );
  return Row;
};
