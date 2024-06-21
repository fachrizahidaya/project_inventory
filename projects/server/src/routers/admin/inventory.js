const router = require("express").Router();
const { inventory } = require("../../controllers");

router.post("/", inventory.add);
router.post("/row", inventory.addRow);
router.get("/", inventory.findAll);
router.get("/row", inventory.findAllRow);
router.get("/:id", inventory.findOne);
router.delete("/:id", inventory.remove);

module.exports = router;
