'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Players.init({
    name: DataTypes.STRING,
    player_id: DataTypes.STRING,
    play_time: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    code_game: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Players',
    underscored: true,
    underscoreAll: true,
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Players;
};