const { Sequelize, DataTypes } = require("sequelize");

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize("test", "rushi", "test1234", {
  host: "localhost",
  dialect: "postgres",
});

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

// (async () => {
//   await User.sync();
// })();
// `sequelize.define` also returns the model

// (async () => {
//   const jack = User.create({
//     firstName: "Jane",
//   });
// })();
