const router = require("express").Router();
const csrfMiddleware = require("../middlewares/csrfMiddleware");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/getCsrfToken", csrfMiddleware, (req, res, next) => {
  res.json({ csrfToken: req.csrfToken() });
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

router.use(require("./auth.routes"));
router.use(require("./owner.routes"));
router.use(require("./ranger.routes"));

module.exports = router;
