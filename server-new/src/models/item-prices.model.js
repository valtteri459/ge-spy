// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class itemPrices extends Model {

  static get tableName() {
    return 'item_prices';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['item', 'timestamp', 'overall', 'accurate'],

      properties: {
        item: { type: 'integer' },
        timestamp: { type: 'string' },
        overall: { type: 'integer' },
        osbBuy: { type: 'integer' },
        osbSell: { type: 'integer' },
        buy_quantity: { type: 'integer' },
        sell_quantity: { type: 'integer' },
        accurate: { type: 'boolean' }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');
  db.schema.dropTableIfExists('item_prices').then(() => {
      db.schema.createTable('item_prices', table => {
        table.integer('item');
        table.timestamp('timestamp');
        table.integer('overall')
        table.integer('osbBuy').nullable()
        table.integer('osbSell').nullable()
        table.integer('buy_quantity').nullable()
        table.integer('sell_quantity').nullable()
        table.boolean('accurate')
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        table.primary(['item', 'timestamp'])
      })
        .then(() => console.log('Created item_prices table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating item_prices table', e)); // eslint-disable-line no-console
    })
      .catch(e => console.error('Error removing item_prices table', e)); // eslint-disable-line no-console

  return itemPrices;
};
