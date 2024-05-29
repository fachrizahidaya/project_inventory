const auth = require("./user/auth");
const adminAuth = require("./admin/auth");
const product = require("./admin/product");
const inventory = require("./admin/inventory");

module.exports = { auth, adminAuth, product, inventory };
