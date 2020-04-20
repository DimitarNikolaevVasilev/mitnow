/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('multimedia', {
    idMultimedia: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    rutaFoto: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'multimedia',
    timestamps: false
  });
};
