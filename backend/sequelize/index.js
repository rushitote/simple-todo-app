const model = require("./model");
const argon2 = require("argon2");
const User = model.User;

model.sync();

async function addUser(username, password) {
  try {
    const userExists = await User.findOne({ where: { username: username } });
    if (userExists) {
      console.log(userExists);
      return { status: false, err: "User already exists" };
    }

    const hashedPass = await argon2.hash(password);

    await User.create({
      username: username,
      password: hashedPass,
    });

    return { status: true };
  } catch (err) {
    return { status: false, err: err };
  }
}

async function getTodos(username) {
  console.log("username = " + username);
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return { status: false, err: "User does not exist" };
    }

    return { status: true, todos: user.todos };
  } catch (err) {
    return { status: false, err: err };
  }
}

async function checkUser(username, password) {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return { status: false, err: "User does not exist" };
    }

    if (await argon2.verify(user.password, password)) {
      return { status: true, user: user };
    } else {
      return { status: false, err: "Wrong password" };
    }
  } catch (err) {
    return { status: false, err: err };
  }
}

async function updateTodos(username, todos) {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return { status: false, err: "User does not exist" };
    }

    await User.update(
      { todos: todos },
      {
        where: { username: username },
      }
    );

    return { status: true };
  } catch (err) {
    return { status: false, err: err };
  }
}

async function findById(id) {
  try {
    const user = await User.findOne({ where: { id: id } });
    return { status: true, user: user };
  } catch (err) {
    return { status: false, err: err };
  }
}
//register (200 or 400(if bad username)), auth-token [POST]
//login (200 or 401), auth-token, todos [POST]
//update (200 or 400), (pass)auth-token [POST]

module.exports = {
  addUser: addUser,
  checkUser: checkUser,
  getTodos: getTodos,
  updateTodos: updateTodos,
  findById: findById,
};
