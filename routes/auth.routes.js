const router = require("express").Router();
const User = require("../models/User.model");
const Ranger = require("../models/Ranger.model");
const bcrypt = require("bcrypt");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn")

// Sign up
router.post("/signup", async (req, res, next) => {
  try {
    const { isUser, username, email, password } = req.body;
    console.log(req.body);
    const userExists = await (isUser
      ? User.findOne({ username })
      : Ranger.findOne({ username }));

    console.log("HEy", userExists);

    if (userExists) {
      throw Error(
        "This User/Ranger already exists. Please choose another name."
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = {
      isUser,
      username,
      email,
      password: passwordHash,
    };
    console.log("Bye", user, isUser)
    const userInDb = await (isUser ? User.create(user) : Ranger.create(user));

    req.session.currentUser = { _id: userInDb._id, isUser, username, email };
    console.log("User session exists?", req.session.currentUser);

    return res.json({
      message: "Successfully signed up user",
      user: req.session.currentUser,
    });
  } catch (err) {
    console.error("Error if user exists from auth.routes", err);
    return res
      .status(400)
      .json({ errorMessage: "Uppss here went something wrong." + err });
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    console.log("line 65 from auth.routes on server", req.body);
    const { isUser, email, password } = req.body;
    const user = await (isUser ? User.findOne({ email }) : Ranger.findOne({ email }))
    if (!user) {
        throw Error();
    }
    const checkedPassword = await bcrypt.compare(password, user.password);
    
    if (!checkedPassword) {
        throw Error();
    }
    
    const userFromDb = user;
    req.session.currentUser = { _id: userFromDb._id, isUser, username: userFromDb.username, email };
    console.log("User session exist?", req.session.currentUser);

    return res.json({
      message: "Successfully logged in!",
      user: req.session.currentUser,
    });

  } catch (err) {
    console.error("Error from line 82 in auth.routes", err);
    return res
      .status(400)
      .json({ errorMessage: "Email or password don't match" + err });
  }
});

// Logout
router.post("/logout", userIsLoggedIn, (req, res, next) => {
    console.log("Do I logout?");
  
    req.session.destroy((err) => {
      if (err) {
        next(err);
      }
      return res.json({ message: "Successfully logged out!" });
    });
  });

module.exports = router;
