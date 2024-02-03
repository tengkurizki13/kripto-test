const { Request } = require("../models");

class RequestController {
  static async order(req, res, next) {
    try {
      // req.body from request
      const { userId, itemId, portion,specialRequest = [{ request: "" }] } = req.body;


      // contional validation if user input portion < 1
      if (portion < 1) {

        // response bad request
       return res.status(400).json(
          {
            message: "your order invalid",
          },)
      }
      // query create request
      await Request.create({
        userId,
        itemId,
        portion,
        specialRequest
      });

      // response success
      res.status(201).json(
        {
          message: "Order has been created successfully",
        },
      );
    } catch (error) {
      // next error to error handler
      next(error);
    }
  }
}

module.exports = RequestController;
