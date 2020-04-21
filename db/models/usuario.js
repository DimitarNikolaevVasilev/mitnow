/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    idUsuario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fecha_de_nac: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pass: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    intereses: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    sexo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    preferencia: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nacionalidad: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'usuario',
    timestamps: false
  });
};
