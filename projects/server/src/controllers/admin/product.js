const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const type = db.Type;
const item = db.Item;

module.exports = {
  addType: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) throw "Required field";
      const result = await type.create({
        name,
      });
      const data = await type.findAll({
        where: {
          id: result.id,
        },
      });
      res.status(200).send({
        message: "New type created",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findAllType: async (req, res) => {
    try {
      const types = await type.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).send(types);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },
};
