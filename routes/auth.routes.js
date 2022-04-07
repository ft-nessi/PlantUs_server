const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

// Sign up for User 
router.post("/signup/user", async (req, res, next) => {
    try{
        const {username, email, password } = req.body
        console.log(req.body);
        const userExists = await User.findOne({username});

        if(userExists) {
            throw Error ("This User/Ranger already exists. Please choose another name.");
        };

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = {
            username,
            email,
            password: passwordHash
        } 
        req.session.currentUser = user;
        console.log("User session exists?", req.session.currentUser); 
        await User.create(user);

        return res.json({message: "Successfully signed up user"})

    } catch(err) {
        console.error("Error if user exists from auth.routes", err);
        return res.status(400).json({errorMessage: "Uppss here went something wrong." + err});
    }
})

// Login for User
router.post("/login/user", async (req, res, next) => {
    try{
        console.log("line 65 from auth.routes on server", req.body);
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) {
            throw Error();
        };
        const checkedPassword = await bcrypt.compare(password, user.password);

        if(!checkedPassword) {
            throw Error()
        }
        req.session.currentUser = user;
        console.log("User session exist?", req.session.currentUser); 
        return res.json({ message: "Successfully logged in!", user: req.session.currentUser });

    } catch(err) {
        console.error("Error from line 82 in auth.routes", err);
        return res.status(400).json({errorMessage: "Email or password don't match" + err});

        // return res.status(400).json({errorMessage: "Email or password don't match"});
    }

})

// // Sign up for Ranger 
// router.post("/signup/ranger", async (req, res, next) => {
//     try{
//         const {rangername, email, password } = req.body
//         const rangerExists = await Ranger.findOne({rangername});

//         if(rangerExists) {
//             throw Error ("This User/Ranger already exists. Please choose another name.");
//         };

//         const salt = await bcrypt.genSalt(10);
//         const passwordHash = await bcrypt.hash(password, salt);

//         const ranger = {
//             rangername,
//             email,
//             password: passwordHash
//         } 
//         await Ranger.create(user);

//         return res.json({message: "Successfully signed up ranger"})

//     } catch(err) {
//         console.err("Error if ranger exists from auth.routes", err);
//         return res.status(400).json({errorMessage: "Uppss here went something wrong."});
//     }
// })


// //Login for Ranger
// router.post("/login/ranger", async (res, req, next) => {
//     try{
//         console.log("line 90 from auth.routes on server", req.body);
//         const { email, password } = req.body;
//         const ranger = await Ranger.findOne({email});

//         if (!ranger) {
//             throw Error();
//         };
//         const checkedPassword = await bcrypt.compare(password, ranger.password);

//         if(!checkedPassword) {
//             throw Error()
//         }
//         req.session.currentRanger = ranger;
//         console.log("Ranger session exists?", req.session.currentRanger); 
//         return res.json({ message: "Successfully logged in!", user: sessionUser });

//     } catch(err) {
//         console.error("Error from line 82 in index.routes", err);
//         return res.status(400).json({errorMessage: "Email or password don't match"});
//     }

// })


module.exports = router;
