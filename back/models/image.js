module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    scr: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  Image.associate = (db) => {
    db.Image.BelongsTo(db.Post);
  }
  return Image;
}