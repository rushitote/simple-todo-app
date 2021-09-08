var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const db = require("../sequelize");

const passportStrategy = new LocalStrategy(function (username, password, done) {
  db.checkUser(username, password)
    .then((user) => {
      if (user.status) {
        return done(null, user.user);
      } else {
        return done(null, false, { message: user.err });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function init(app) {
  app.use(
    session({
      saveUninitialized: true,
      resave: true,
      secret: "no_secret", //leaving this like this for now
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 4 * 60 * 60 * 1000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(passportStrategy);

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.findById(id).then((user) => {
      done(user.err, user.user);
    });
  });
}

function create(req, res) {
  const { username, password } = req.body;

  db.addUser(username, password)
    .then((result) => {
      if (!result.status) {
        res.status(400);
        res.send({ err: result.err });
      } else {
        res.status(200);
        res.send("ok");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function get(req, res) {
  const username = req.user.username;

  if (req.isAuthenticated()) {
    db.getTodos(username).then((result) => {
      if (!result.status) {
        res.status(500);
        res.send({ err: result.err });
      } else {
        res.status(200).send({ todos: result.todos });
      }
    });
  } else {
    res.status(401);
    res.send("Sorry, not authenticated.");
  }
}

function update(req, res) {
  const username = req.user.username;
  const { todos } = req.body;

  if (req.isAuthenticated()) {
    db.updateTodos(username, todos).then((result) => {
      if (!result.status) {
        res.status(500);
        res.send({ err: result.err });
      } else {
        res.status(200).send("Updated successfully");
      }
    });
  } else {
    res.status(401);
  }
}

function login(req, res) {
  passport.authenticate(
    "local",
    {
      session: true,
    },
    (err, user) => {
      if (err) {
        return res.status(400).json({ err: err });
      } else {
        req.session.save();
        req.logIn(user, (err) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ err: err });
          }
        });
        return res.status(200).json({ message: "Successfully logged in." });
      }
    }
  )(req, res);
}

function logout(req, res) {
  req.logout();
  req.session.destroy();
  res.status(200).send("Logged out successfully");
}

module.exports = {
  init: init,
  login: login,
  logout: logout,
  get: get,
  update: update,
  create: create,
};
