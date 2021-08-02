'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      deadline: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
    }
  );
  return Task;
};
