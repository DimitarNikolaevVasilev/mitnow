/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tag', {
    idUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'tag',
    timestamps: false
  });
};
