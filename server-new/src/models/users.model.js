// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class users extends Model {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],

      properties: {
      
        email: 'string',
        password: 'string',
        openTabs: 'string',
        savedLayout: 'string'
      
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
  db.schema.dropTableIfExists('users').then(() => {
      db.schema.createTable('users', table => {
      table.increments('id');
    
      table.string('email').notNullable().unique();
      table.string('password');
      table.text('openTabs').nullable();
      table.text('savedLayout').nullable();
    
    
      table.timestamp('createdAt');
      table.timestamp('updatedAt');
    })
      .then(() => console.log('Created users table')) // eslint-disable-line no-console
      .catch(e => console.error('Error creating users table', e)); // eslint-disable-line no-console
  })
    .catch(e => console.error('Error removing users table', e)); // eslint-disable-line no-console
  

  return users;
};
