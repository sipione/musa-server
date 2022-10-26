'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: "user_id"
      })
    }
  }
  Image.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    user_id: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};