const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const rack = db.Rack;
const row = db.Row;
const items = db.Item;

module.exports = {
  /**
   * Controller for Rack
   * @param {*} req
   * @param {*} res
   */
  add: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) throw "Required field";
      const isExist = await rack.findOne({
        where: {
          name: name,
        },
      });
      if (isExist) throw "Rack existed";
      const result = await rack.create({
        name,
      });
      const data = await rack.findAll({
        where: {
          id: result.id,
        },
      });
      res.status(200).send({ message: "New rack created", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findAll: async (req, res) => {
    try {
      const data = await rack.findAll({
        include: [{ model: row }],
      });
      if (!data) throw "Not Found";
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findOne: async (req, res) => {
    try {
      const data = await rack.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: row }],
      });
      if (!data) throw "Not Found";
      res.status(200).send({ data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  remove: async (req, res) => {
    try {
      const result = await rack.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!result) throw "Not found";
      const data = await rack.findAll();
      res.status(200).send({ message: "Remove success", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },
  /***************************************************************************** */
  addRow: async (req, res) => {
    try {
      const { name, rackId } = req.body;
      if (!name && !rackId) throw "Required field";
      const isExist = await row.findOne({
        where: {
          name: name,
        },
      });
      if (isExist) throw "Row existed";
      const result = await row.create({
        name,
        RackId: rackId,
      });
      const data = await row.findOne({
        where: {
          id: result.id,
        },
      });
      res.status(200).send({ message: "New row created", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findAllRow: async (req, res) => {
    try {
      const data = await row.findAll({
        include: [{ model: rack }],
      });
      if (!data) throw "Not Found";
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findOneRow: async (req, res) => {
    try {
      const data = await row.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: items }],
      });
      if (!data) throw "Not Found";
      res.status(200).send({ data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },
};
