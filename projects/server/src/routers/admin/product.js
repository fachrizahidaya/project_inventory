const router = require("express").Router();
const { product } = require("../../controllers");

router.post("/", product.addType);
router.get("/", product.findAllType);

module.exports = router;
