const router = require("express").Router();
const Ranger = require("../models/Ranger.model");
const Tree = require("../models/Tree.model");
const rangerIsLoggedIn = require("../middlewares/rangerIsLoggedIn");
const userIsLoggedIn = require("../middlewares/userIsLoggedIn");



router.post("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {
  // console.log("HeyBye", req.body);
  const { kind, coordinatesX, coordinatesY } = req.body;
  // console.log("Should create a new tree with:", kind, coordinatesX, coordinatesY);
  try {
    const locationExists = await Tree.findOne( {"location.coordinatesX": coordinatesX, "location.coordinatesY": coordinatesY} );
    // console.log("LocationExsits?", locationExists)
    if(locationExists) {
        throw Error("This location already exists! Please choose other coordinates")
    }

    const newTree = {
      treename: "New tree",
      kind,
      location: {
        type: "Point",
        coordinatesX,
        coordinatesY
      },
      rangerId: req.session.currentUser._id
    };
    console.log(newTree);
    await Tree.create(newTree);
    res.json({
      message: "Tree was successfully added to the db",
      tree: newTree
    });
  } catch (err) {
    res.status(400).json({ errorMessage: "Something went wrong" + err });
  }
});

router.get("/ranger/markedtrees/all", userIsLoggedIn, async (req, res, next) => {
  try {
    const trees = await Tree.find();
    console.log("Hey this are the trees in line 21", trees);

    res.json({ trees });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in fetching trees from server!" });
  }
});

router.get("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {
  console.log("Bla", req.session.currentUser._id)
  try {
    const trees = await Tree.find({rangerId: req.session.currentUser._id});
    console.log("Hey this are the trees in line 21", trees);

    res.json({ trees });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in fetching trees from server!" });
  }
});

router.put("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {
    try{
        console.log(req.body);
        const {_id, treename, rangerId, kind, location} = req.body;
        const locationExists = await Tree.findOne( {location} );
    console.log("LocationExsits?", locationExists)

    if(locationExists && _id !== locationExists._id.toString()) {
        throw Error("This location already exists! Please choose other coordinates")
    }

        if(!_id) {
            throw Error("Please provide a valid _id in your request")
        }

        await Tree.findByIdAndUpdate( _id, {treename, rangerId, kind, location});
        const updatedTree = await Tree.findOne({_id});

        res.json({message:"Successfully updated todo!", update: updatedTree})

    }catch(err){
        res.status(400).json({errorMessage: "Error in updating tree!" + err})
    }

});

router.post(
  "/ranger/markedtrees/delete",
  rangerIsLoggedIn,
  async (req, res, next) => {
    console.log("Hi", req.body);
    try {
      const { _id } = req.body;
      await Tree.findByIdAndDelete(_id);

      res.json({ message: "Successfully delete tree " + _id });
    } catch (err) {
      res.status(400).json({ errorMessage: "Error in deleting todo! " + err });
    }
  }
);

module.exports = router;
