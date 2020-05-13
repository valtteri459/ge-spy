// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class items extends Model {

  static get tableName() {
    return 'items';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'members', 'storePrice'],

      properties: {
        name: { type: 'string' },
        members: { type: 'boolean' },
        storePrice: { type: 'number' },
        overall: { type: 'integer' },
        osbBuy: { type: ['integer', 'null'] },
        osbSell: { type: ['integer', 'null'] },
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

  db.schema.hasTable('items').then((iftable) => {
    if(!iftable) {
      db.schema.createTable('items', table => {
        table.integer('id').primary();
        table.string('name');
        table.boolean('members');
        table.integer('overall')
        table.integer('osbBuy').nullable()
        table.integer('osbSell').nullable()
        table.integer('storePrice');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created items table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating items table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error removing items table', e)); // eslint-disable-line no-console

  return items;
};
