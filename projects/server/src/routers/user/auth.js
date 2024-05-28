const router = require("express").Router();
const { auth } = require("../../controllers");

router.post("/", auth.register);

module.exports = router;
