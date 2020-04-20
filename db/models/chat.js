/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat', {
    idChat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    fechaCreacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'chat',
    timestamps: false
  });
};
