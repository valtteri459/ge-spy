const { authenticate } = require('@feathersjs/authentication').hooks;
const errors = require('@feathersjs/errors')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ () => {
      throw new errors.Forbidden('This endpoint is disabled on this server')
    }],
    get: [ authenticate('jwt'), (hook) => {
      console.log('IMPLEMENT TO ONLY GET CURRENT USER')
      return hook;
    }],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt'), (hook) => {
      console.log('IMPLEMENT TO ONLY UPDATE CURRENT USER')
      return hook;
    }],
    patch: [ hashPassword('password'),  authenticate('jwt'), (hook) => {
      console.log('IMPLEMENT TO ONLY UPDATE CURRENT USER')
      return hook;
    }],
    remove: [ authenticate('jwt'), (hook) => {
      console.log('IMPLEMENT TO ONLY UPDATE CURRENT USER')
      return hook;
    }]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
