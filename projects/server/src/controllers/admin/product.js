const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const type = db.Type;
const item = db.Item;
const row = db.Row;

module.exports = {
  /**
   * Controller for Type
   * @param {*} req
   * @param {*} res
   */
  add: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) throw "Required field";
      const isExist = await type.findOne({
        where: { name: name },
      });
      if (isExist) throw "Type existed";
      const result = await type.create({ name });
      const data = await type.findOne({
        where: { id: result.id },
      });
      res.status(200).send({ message: "New type created", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findAll: async (req, res) => {
    try {
      const data = await type.findAll({});
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findOne: async (req, res) => {
    try {
      const data = await type.findOne({
        where: { id: req.params.id },
      });
      if (!data) throw "Not Found";
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  update: async (req, res) => {
    try {
      const { name } = req.body;
      const isExist = await type.findOne({ where: { id: req.params.id } });
      if (!isExist) throw "Not found";
      await type.update({ name }, { where: { id: req.params.id } });
      const data = await type.findOne({ where: { id: req.params.id } });
      res.status(200).send({
        message: "Type updated",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  remove: async (req, res) => {
    try {
      const result = await type.destroy({
        where: { id: req.params.id },
      });
      if (!result) throw "Not found";
      const data = await type.findAll();
      res.status(200).send({ message: "Remove success", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },
  /***************************************************************************** */
  addItem: async (req, res) => {
    try {
      const { name, typeId } = req.body;
      if (!name && !typeId) throw "Required field";
      const isExist = await item.findOne({
        where: { name: name },
      });
      if (isExist) throw "Item existed";
      const result = await item.create({ name, TypeId: typeId });
      const data = await item.findOne({
        where: { id: result.id },
      });
      res.status(200).send({ message: "New item added", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findAllItem: async (req, res) => {
    try {
      const data = await item.findAll({
        include: [{ model: type }, { model: row }],
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  findOneItem: async (req, res) => {
    try {
      const data = await item.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: row }, { model: type }],
      });
      if (!data) throw "Not Found";
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  updateItem: async (req, res) => {
    try {
      const { name, unit, qty, rowId, typeId } = req.body;
      const isExist = await item.findOne({ where: { id: req.params.id } });
      if (!isExist) throw "Not found";
      await item.update({ name, qty, unit, RowId: rowId, TypeId: typeId }, { where: { id: req.params.id } });
      const data = await item.findOne({ where: { id: req.params.id } });
      res.status(200).send({ message: "Item updated", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },

  removeItem: async (req, res) => {
    try {
      const result = await item.destroy({
        where: { id: req.params.id },
      });
      if (!result) throw "Not found";
      const data = await type.findAll();
      res.status(200).send({ message: "Remove success", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },
};
