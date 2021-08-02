const createHttpError = require('http-errors');
const { User } = require('../db/models');
const Controller = require('./');

class UserController extends Controller {
  static model = User;

  static getAllUsers = async (req, res, next) => {
    try {
      const users = await this.getAll();

      if (!users) {
        return next(createHttpError(400, 'Task can not be saved'));
      }

      res.send({ data: users });
    } catch (error) {
      next(error);
    }
  };
  
  static createUser = async (req, res, next) => {
    try {
      const { body } = req;
      console.log(body)
      const users = await this.create(body);

      if (!users) {
        return next(createHttpError(400, 'Task can not be saved'));
      }

      res.send({ data: users });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
