const ownerIsLoggedIn = (req, res, next) => {
  if (req.session.currentUser.isUser === true) {
    return next();
  }
  return res
    .status(401)
    .json({ errorMessage: "Owner has to be logged in to view this page" });
};

module.exports = ownerIsLoggedIn;
