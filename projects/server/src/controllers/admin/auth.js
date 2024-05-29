const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const { Op } = require("sequelize");
const path = require("path");

const admin = db.Admin;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, isSuper, TeamId } = req.body;
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      const data = await admin.create({
        email,
        password: hashPassword,
        isSuper,
        TeamId,
      });
      const payload = {
        email: data.email,
        isSuper: data.isSuper,
        TeamId: data.TeamId,
      };
      const token = jwt.sign(payload, "inventory", { expiresIn: "1h" });
      res.status(200).send({
        message: "Admin created",
        data,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const isAccountExist = await admin.findOne({
        where: {
          email: email || "",
        },
      });
      if (!isAccountExist) throw "Account not found";
      const isValid = await bcrypt.compare(password, isAccountExist.password);
      if (!isValid) throw "Incorrect password";
      const payload = {
        id: isAccountExist.id,
        email: isAccountExist.email,
      };
      const token = jwt.sign(payload, "inventory");
      res.status(200).send({ message: "Welcome to Admin Page", isAccountExist, token });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "inventory");
      const result = await admin.findOne({
        where: {
          id: verify.id,
          email: verify.email,
        },
      });
      res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },
};
