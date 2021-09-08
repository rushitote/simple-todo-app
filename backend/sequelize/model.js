const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("DB_NAME", "USERNAME", "PASSWORD", {
  host: "localhost",
  dialect: "postgres",
});

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    todos: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "UserList",
    // Other model options go here
  }
);

async function sync() {
  await User.sync();
}

module.exports = {
  User,
  sync,
};
