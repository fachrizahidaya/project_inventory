const router = require("express").Router();
const { adminAuth } = require("../../controllers");

router.post("/", adminAuth.register);
router.post("/login", adminAuth.login);
router.get("/", adminAuth.keepLogin);

module.exports = router;
