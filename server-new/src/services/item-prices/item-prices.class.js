const { Service } = require('feathers-objection');

exports.ItemPrices = class ItemPrices extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
