/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('relacion', {
    idUsuario1: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    idUsuario2: {
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
      allowNull: false,
      primaryKey: true
    },
    ubicacion: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'relacion',
    timestamps: false
  });
};
