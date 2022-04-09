const router = require("express").Router();
const Ranger = require("../models/Ranger.model");
const Tree = require("../models/Tree.model");
const rangerIsLoggedIn = require("../middlewares/rangerIsLoggedIn.js");

router.post("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {
  try {
    console.log(req.body);
    const { treename, kind, location } = req.body;
    const locationExists = await Tree.findOne({ location });

    if(locationExists) {
        throw Error("This location already exists! Please choose other coordinates")
    }

    console.log("Should create a new tree with:", treename, kind, location);

    const newTree = new Tree({
        treename,
        kind,
        location,
        rangerId: req.session.currentUser._id
    })
    await newTree.save()
    console.log("This is the tree", newTree);
    res.json({message:"Tree was successfully added to the db", tree: newTree});

  } catch(err) {
      res.status(400).json({errorMessage: "Something went wrong" + err})
  }
});

router.get("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {
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

// router.put("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {
//     try{
//         console.log(req.body);
//         const {_id, treename, rangerId, kind, location} = req.body;

//         if(!_id) {
//             throw Error("Please provide a valid _id in your request")
//         }

//         const updatedTree = await Tree.findByIdAndUpdate( _id, {treename, rangerId, kind, location});

//         res.json({message:"Successfully updated todo!", update: updatedTree})
        
//     }catch(err){
//         res.status(400).json({errorMessage: "Error in updating tree!" + err})
//     }
  
// });

// router.delete(
//   "/ranger/markedtrees",
//   rangerIsLoggedIn,
//   async (req, res, next) => {
//     // finde den Baum mit der Id und lösche ihn
//     //
//     // res.json({tree})
//   }
// );

module.exports = router;
