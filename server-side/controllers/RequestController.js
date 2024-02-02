const { Request } = require("../models");

class RequestController {
  static async order(req, res, next) {
    try {
      // req.body
      const { userId, itemId, portion,specialRequest = [{ request: "" }] } = req.body;

      if (portion < 1) {
       return res.status(400).json(
          {
            message: "your order invalid",
          },)
      }
      // create new User
      await Request.create({
        userId,
        itemId,
        portion,
        specialRequest
      });

      // response
      res.status(201).json(
        {
          message: "Order has been created successfully",
        },
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RequestController;
