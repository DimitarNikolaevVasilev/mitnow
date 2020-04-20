/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('misfotos', {
    idFoto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'misfotos',
    timestamps: false
  });
};
