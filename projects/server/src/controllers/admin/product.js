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
      if (data) {
        res.status(200).send(data);
      }
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
      const { page, limit, order, sort, search } = req.query;
      const _page = parseInt(page) || 0;
      const _limit = parseInt(limit) || 10;
      const _offset = _limit * _page;
      const _search = search || "";
      const _order = order || "id";
      const _sort = sort || "ASC";

      const total_row = await item.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + _search + "%",
              },
            },
          ],
        },
      });
      const total_page = Math.ceil(total_row / limit);

      const data = await item.findAll({
        limit: _limit,
        offset: _offset,
        order: [[_order, _sort]],
        include: [{ model: type }, { model: row }],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + _search + "%",
              },
            },
          ],
        },
      });
      res.status(200).send({ data: data, page: _page, limit: _limit, total_row: total_row, total_page: total_page });
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
      const { name, typeId } = req.body;
      const isExist = await item.findOne({ where: { id: req.params.id } });
      if (!isExist) throw "Not found";
      await item.update({ name, TypeId: typeId }, { where: { id: req.params.id } });
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
      res.status(200).send({ message: "Item Removed", data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: false, err });
    }
  },
};
