/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fotoperfil', {
    idFotoPerfil: {
      type: DataTypes.INTEGER(11).UNSIGNED,
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
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    esBorrada: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'fotoperfil',
    timestamps: false
  });
};
