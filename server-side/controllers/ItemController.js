const { Item } = require("../models");

class ItemController {
  static async items(req, res, next) {
    let option = {
      order: [["id", "ASC"]],
    };
    try {
      let items = await Item.findAll(option);
      res.status(200).json(items);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async itemDetail(req, res, next) {
    const { id } = req.params;
    try {
      let item = await Item.findByPk(id);

      if (!item) throw { name: "notFound" };

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ItemController;
