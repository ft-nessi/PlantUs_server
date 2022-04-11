const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.use(require("./auth.routes"));
router.use(require("./owner.routes"));
router.use(require("./ranger.routes"));

module.exports = router;
