'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let dateNow = new Date()
    DATA.map(item => {
      item.created_at = dateNow
      item.updated_at = dateNow
    })
    await queryInterface.bulkInsert(TABLE, DATA, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(TABLE, null, {});
  }
};

const TABLE = "Players"

const DATA = [
  {
    "name": "Oat",
    "player_id": "S5851101",
    "play_time": 120,
    "score": 50,
    "code_game": "HELLPO"
  },
  {
    "name": "Maple",
    "player_id": "S5851102",
    "play_time": 122,
    "score": 53,
    "code_game": "HELLPO"
  },
]