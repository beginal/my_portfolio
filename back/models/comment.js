module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
  });
  Comment.associate = (db) => {
    db.Comment.BelongsTo(db.Post);
    db.Comment.BelongsTo(db.User)
  }
  return Comment;
}