const { Item } = require("../models");

class ItemController {
  static async items(req, res, next) {
    try {
      // contional for ascanding
      let option = {
        order: [["id", "ASC"]],
      };

      // query get all items
      let items = await Item.findAll(option);

      // response success
      res.status(200).json(items);
    } catch (error) {
      // next error to error handler
      next(error);
    }
  }

  static async itemDetail(req, res, next) {
    try {

      // get id from params
      const { id } = req.params;


      // query get item by id
      let item = await Item.findByPk(id);


      // contion if item with id notfound
      if (!item) throw { name: "notFound" };
      

      // response success
      res.status(200).json(item);
    } catch (error) {
      // next error to error handler
      next(error);
    }
  }
}

module.exports = ItemController;
