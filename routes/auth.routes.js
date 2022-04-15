const router = require("express").Router();
const User = require("../models/User.model");
const Tree = require("../models/Tree.model");
const Ranger = require("../models/Ranger.model");
const bcrypt = require("bcrypt");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");
const rangerIsLoggedIn = require("../middlewares/rangerIsLoggedIn");
const uploader = require("../middlewares/cloudinary.config.js");
const userOrRanger = require("../common/userOrRanger");

// Sign up

router.get("/user", async (req, res, next) => {
  if (req.session.currentUser) {
    const user = req.session.currentUser.isUser
      ? await User.findById(req.session.currentUser._id)
      : await Ranger.findById(req.session.currentUser._id);
    console.log(req.session.currentUser._id, user);
    res.status(200).json({ user });
  } else {
    res.status(401).json({ messager: "Not logged in!" });
  }
});

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
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = {
      isUser,
      username,
      email,
      password: passwordHash,
    };
    console.log("Bye", user, isUser);
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
    const user = await (isUser
      ? User.findOne({ email })
      : Ranger.findOne({ email }));
    if (!user) {
      throw Error();
    }
    const checkedPassword = await bcrypt.compare(password, user.password);
    console.log(checkedPassword);
    if (!checkedPassword) {
      throw Error();
    }
    // const findUserFromDb = await User.findById(req.session.currentUser._id)
    const userFromDb = user;
    req.session.currentUser = {
      _id: userFromDb._id,
      isUser,
      username: userFromDb.username,
      email,
      imageUrl: userFromDb.imageUrl,
      motivation: userFromDb.motivation,
    };
    console.log("dibibib", user);
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

//update motivation of user

router.put("/updatemotivation", userIsLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    const { motivation } = req.body;

    await userOrRanger(req.session.currentUser).findByIdAndUpdate(req.session.currentUser._id, { motivation });
    const updatedUser = await userOrRanger(req.session.currentUser).findById(req.session.currentUser._id);
    console.log("hi updated user", updatedUser);

    res.json({ message: "Successfully updated motivation!", updatedUser });
  } catch (err) {
    res.status(400).json({ errorMessage: "Error in updating tree!" + err });
  }
});

// route to upload a picture

router.post("/upload", uploader.single("imageUrl"), async (req, res, next) => {
  // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
  console.log("file is: ", req.file);

  if (!req.file) {
    console.log("there was an error uploading the file");
    next(new Error("No file uploaded!"));
    return;
  }

  // You will get the image url in 'req.file.path'
  // Your code to store your url in your database should be here
  try {
    await userOrRanger(req.session.currentUser).findByIdAndUpdate(req.session.currentUser._id, {
      imageUrl: req.file.path,
    });
    const updatedUser = await userOrRanger(req.session.currentUser).findById(req.session.currentUser._id);

    res
      .status(200)
      .json({
        message: "Profile image was successfully uploaded to the db",
        updatedUser,
      });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "There was an error while updating the image to the database",
        err,
      });
  }
});

// get all trees for map on Homepage
router.get("/alltrees", async (req, res, next) => {
  try {
    const trees = await Tree.find();
    res.json({ trees });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in fetching trees from server!" });
  }
});

module.exports = router;
