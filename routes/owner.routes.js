const router = require("express").Router();
const User = require("../models/User.model");
const Tree = require("../models/Tree.model");
const ownerIsLoggedIn = require("../middlewares/ownerIsLoggedIn")


module.exports = router;

router.get("/owner/mytrees", ownerIsLoggedIn, async (req, res, next) => {
    try {
      const trees = await Tree.find({ownerId: req.session.currentUser._id});
      console.log("Trees in owner.routes Line 11", trees);
  
      res.json({ trees });
    } catch (err) {
      res
        .status(400)
        .json({ errorMessage: `Error in fetching trees from server! ${err.message}` });
    }
  });

  router.put("/owner/mytrees", ownerIsLoggedIn, async (req, res, next) => {
    try{
        console.log(req.body);
        const {_id, treename, rangerId, kind, location, plantedDate } = req.body;
        const locationExists = await Tree.findOne( {location} );
    console.log("LocationExsits?", locationExists)

    if(locationExists && _id !== locationExists._id.toString()) {
        throw Error("This location already exists! Please choose other coordinates")
    }

        if(!_id) {
            throw Error("Please provide a valid _id in your request")
        }

        const newOwnerId = req.session.currentUser._id
        const newPlantedDate = plantedDate

        await Tree.findByIdAndUpdate( _id, {treename, ownerId: newOwnerId, rangerId, kind, location, plantedDate: newPlantedDate});
        const updatedTree = await Tree.findOne({_id});

        res.json({message:"Successfully updated todo!", update: updatedTree})

    }catch(err){
        res.status(400).json({errorMessage: "Error in updating tree!" + err})
    }
});
