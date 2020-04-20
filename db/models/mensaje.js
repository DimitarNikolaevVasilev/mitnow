/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mensaje', {
    idChat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chat',
        key: 'idChat'
      }
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
      allowNull: false,
      primaryKey: true
    },
    mensaje: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    esBorrado: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    foto: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    tipoMensaje: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'mensaje',
    timestamps: false
  });
};
