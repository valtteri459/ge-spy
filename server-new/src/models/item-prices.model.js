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
      required: ['overall'],

      properties: {
        item: { type: 'integer' },
        timestamp: { type: 'integer' },
        overall: { type: 'integer' },
        osbBuy: { type: ['integer', 'null'] },
        osbSell: { type: ['integer', 'null'] },
        buy_quantity: { type: ['integer', 'null'] },
        sell_quantity: { type: ['integer', 'null'] }
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
  db.schema.hasTable('item_prices').then((iftable) => {
    if (!iftable) {
      db.schema.createTable('item_prices', table => {
        table.integer('item');
        table.bigint('timestamp');
        table.integer('overall')
        table.integer('osbBuy').nullable()
        table.integer('osbSell').nullable()
        table.integer('buy_quantity').nullable()
        table.integer('sell_quantity').nullable()
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        table.primary(['item', 'timestamp'])
      })
        .then(() => console.log('Created item_prices table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating item_prices table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error checking item_prices table', e)); // eslint-disable-line no-console

  return itemPrices;
};
