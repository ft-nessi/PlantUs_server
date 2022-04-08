const router = require("express").Router();
const Ranger = require("../models/Ranger.model");
const Tree = require("../models/Tree.model");
const rangerIsLogedIn = require ("../middlewares/rangerIsLogedIn.js");

// router.get("/ranger/trees", rangerIsLogedIn, async (req,res, next)=> {
//     try{
//         const trees = await

//     }catch(err){
//         res.status(400).json({errorMessage: "Error in fetching todos from server! " + err})
//     }
// })

router.post("/logout/ranger", rangerIsLogedIn, (req, res, next) => {
    console.log("Do I logout?");
  
    req.session.destroy((err) => {
      if (err) {
        next(err);
      }
      return res.json({ message: "Successfully logged out!" });
    });
  });


module.exports = router;
