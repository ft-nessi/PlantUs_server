const ownerIsLoggedIn = (req, res, next) => {
    // To Do: Add Roles to the Usermodel
  if (req.session.currentUser.isUser === true) {
    return next();
  }
  return res
    .status(401)
    .json({ errorMessage: "Owner has to be logged in to view this page" });
};

module.exports = ownerIsLoggedIn;
