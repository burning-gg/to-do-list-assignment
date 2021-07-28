module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    "Tasks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ends_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "medium",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "to start",
      },
      creatorUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      resUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Tasks;
};
