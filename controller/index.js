class Controller {
  static model = null;

  static create (values, options) {
    return this.model.create(values, options);
  }

  static async updateById (values, id) {
    const [count, [updatedData]] = await this.model.update(values, {
      where: { id },
      returning: true,
    });
    return updatedData;
  }

  static deleteById (id, options) {
    return this.model.destroy({ where: { id } }, options);
  }

  static getAll (options) {
    return this.model.findAll({
      ...options,
    });
  }

  static getOneById (id) {
    return this.model.findByPk(id);
  }
}

module.exports = Controller;
