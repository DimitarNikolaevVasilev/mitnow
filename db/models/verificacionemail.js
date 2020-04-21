/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('verificacionemail', {
    idUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    token: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    tableName: 'verificacionemail',
    timestamps: false
  });
};
