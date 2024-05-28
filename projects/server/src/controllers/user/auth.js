const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const { Op } = require("sequelize");
const path = require("path");

const user = db.User;

module.exports = {
  register: async (req, res) => {
    try {
      const {} = req.body;
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },
};
