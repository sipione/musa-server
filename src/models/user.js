'use strict';
const bcrypt = require("bcrypt");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Image, {
        foreignKey: "user_id"
      })
    }

    static hashPassword(password){
      const custoHash = 12;
      return bcrypt.hash(password, custoHash);
    }

    static async validatePassword(password, hashPassword){
      const result = await bcrypt.compare(password, hashPassword)
      
      if(!result){
        throw new Error("invalid user or password")
      }
      
      return result
    }

    static async jwtAuthorization(){
      
    }
    
  }
  User.init({
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    },
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mother: DataTypes.BOOLEAN,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    blocked: DataTypes.BOOLEAN,
    confirmed: DataTypes.BOOLEAN,
    category:DataTypes.STRING,
    profession: DataTypes.STRING,
    phone: DataTypes.STRING,
    about: DataTypes.STRING,
    site: DataTypes.STRING,
    instagram: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};