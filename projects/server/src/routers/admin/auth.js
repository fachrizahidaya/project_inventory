const router = require("express").Router();
const { adminAuth } = require("../../controllers");

router.post("/", adminAuth.register);
router.post("/login", adminAuth.login);
router.get("/", adminAuth.findAll);
router.get("/keep-login", adminAuth.keepLogin);
router.get("/:id", adminAuth.findOne);
router.delete("/:id", adminAuth.remove);

module.exports = router;
