const router = require("express").Router();
const { product } = require("../../controllers");

router.post("/", product.add);
router.post("/item", product.addItem);
router.get("/", product.findAll);
router.get("/item", product.findAllItem);
router.get("/:id", product.findOne);
router.get("/item/:id", product.findOneItem);
router.patch("/:id", product.update);
router.patch("/item/:id", product.updateItem);
router.delete("/:id", product.remove);

module.exports = router;
