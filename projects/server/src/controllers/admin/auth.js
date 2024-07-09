const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");
const { Op } = require("sequelize");
const path = require("path");

const db = require("../../models");
const transporter = require("../../middlewares/transporter");

const admin = db.Admin;

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, confirmPassword, isSuper } = req.body;

      if (!email && !password && !confirmPassword && !isSuper) throw "Fields must not empty";
      if (password.length < 8) throw "Minimum 8 characters to create password";
      if (password !== confirmPassword) throw "Password not match!";

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const data = await admin.create({
        email,
        password: hashPassword,
        isSuper: isSuper,
      });

      const payload = {
        email: data.email,
        isSuper: data.isSuper,
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

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const isAccountExist = await admin.findOne({
        where: { email },
      });
      if (!isAccountExist) throw "Account not found";
      const payload = {
        id: isAccountExist.id,
        email: isAccountExist.email,
      };
      const token = jwt.sign(payload, "inventory", { expiresIn: "1h" });

      const tempEmail = fs.readFileSync(path.join(__dirname, "../../templates/reset.html"), "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email: isAccountExist.email,
        link: `http://localhost:3000/reset-password/${token}`,
      });
      await transporter.sendMail({
        from: "Super Admin",
        to: email,
        subject: "Reset Account Password",
        html: tempResult,
      });
      res.status(200).send({
        message: "Please check your email",
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password, confirmPassword } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      let decoded;
      decoded = jwt.verify(token, "inventory");
      const { email } = decoded;
      const isAccountExist = await admin.findOne({
        where: {
          email,
        },
      });

      if (!password && !confirmPassword) throw "Fields must not empty";
      if (password.length < 8) throw "Minimum 8 characters to create password";
      if (password !== confirmPassword) throw "Password not match!";

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      await admin.update(
        {
          password: hashPass,
        },
        {
          where: {
            email,
          },
        }
      );
      const tempEmail = fs.readFileSync(path.join(__dirname, "../../templates/change-password.html"), "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email,
      });
      await transporter.sendMail({
        from: "Super Admin",
        to: email,
        subject: "Password Changed",
        html: tempResult,
      });

      res.status(200).send({ message: "Please login again", data: isAccountExist });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  findAll: async (req, res) => {
    try {
      const data = await admin.findAll({});
      if (!data) throw "Data not found";
      res.status(200).send({ data });
    } catch (err) {
      res.status(500).send({ message: false, err });
    }
  },

  findOne: async (req, res) => {
    try {
      const data = await admin.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!data) throw "Admin not found";
      res.status(200).send({ data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },

  remove: async (req, res) => {
    try {
      const result = await admin.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!result) throw "Admin not found";
      const data = await admin.findAll({});
      res.status(200).send({ message: "Admin removed", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, err });
    }
  },
};
