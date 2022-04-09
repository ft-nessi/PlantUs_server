const router = require("express").Router();
const Ranger = require("../models/Ranger.model");
const Tree = require("../models/Tree.model");
const rangerIsLoggedIn = require ("../middlewares/rangerIsLogedIn.js");


router.post("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {

    // gibt es einen Baum mit der location?
    // wenn es ihn nicht gibt, dann lege ihn an und sende das object wieder
    // zurück
    //
    // res.json({tree})
    
    } )

outer.get("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {

// finde alle Bäume mit der Id des rangers
//
// res.json({[trees]})

} )


router.put("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {

    // finde den Baum mit der Id und update ihn
    //
    // res.json({tree})
    
 } )

 router.delete("/ranger/markedtrees", rangerIsLoggedIn, async (req, res, next) => {

    // finde den Baum mit der Id und lösche ihn
    //
    // res.json({tree})
    
 } )


module.exports = router;
