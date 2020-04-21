/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('token', {
    idtoken: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'idUsuario'
      }
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    external_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    hmac: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'token',
    timestamps: false
  });
};
