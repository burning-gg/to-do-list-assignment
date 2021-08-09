"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tasks.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ends_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "medium",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "to start",
      },
      creator_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      res_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tasks",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Tasks;
};
