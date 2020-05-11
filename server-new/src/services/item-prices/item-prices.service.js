// Initializes the `itemPrices` service on path `/item-prices`
const { ItemPrices } = require('./item-prices.class');
const createModel = require('../../models/item-prices.model');
const hooks = require('./item-prices.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    id: ['item', 'timestamp'],
    idSeparator: ','
  };

  // Initialize our service with any options it requires
  app.use('/item-prices', new ItemPrices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('item-prices');

  service.hooks(hooks);
};
