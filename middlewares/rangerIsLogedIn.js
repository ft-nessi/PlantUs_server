const rangerIsLogedIn = (req, res, next) => {
    if(!req.session.currentRanger) {
        return next();
    }
    return res
      .status(401)
      .json({ errorMessage: "Ranger has to be logged in to view this page" });
  };
   
  module.exports = rangerIsLogedIn;
