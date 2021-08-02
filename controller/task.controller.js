const createHttpError = require('http-errors');
const { Task } = require('../db/models');
const Controller = require('./');

class TaskController extends Controller {
  static model = Task;

  static createTask = async (req, res, next) => {
    try {
      const {
        body,
        params: { userId },
      } = req;

      const task = await this.create({ ...body, userId });

      if (!task) {
        return next(createHttpError(400, 'Task can not be saved'));
      }

      res.send({ data: task });
    } catch (error) {
      next(error);
    }
  };

  static getAllTasks = async (req, res, next) => {
    try {
      const {
        params: { userId },
        pagination,
      } = req;
      const tasks = await this.getAll({
        where: { userId },
        ...pagination,
        order: ['createdAt'],
      });

      if (!tasks) {
        return next(createHttpError(404, 'Tasks not found'));
      }

      res.send({ data: tasks });
    } catch (error) {
      next(error);
    }
  };

  static updateTask = async (req, res, next) => {
    try {
      const {
        body,
        params: { taskId },
      } = req;

      const updatedTask = await this.updateById(body, taskId);

      res.send({ data: updatedTask });
    } catch (error) {
      next(error);
    }
  };

  static deleteTask = async (req, res, next) => {
    try {
      const {
        params: { taskId },
      } = req;

      const count = await this.deleteById(taskId);

      if (count === 0) {
        return next(createHttpError(404, 'Task Not Found'));
      }
      res.send({ data: taskId });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TaskController;
