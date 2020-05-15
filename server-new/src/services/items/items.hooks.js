
const fou = require('../../middleware/findOrUpdate')
const { disallow } = require('feathers-hooks-common')
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [disallow('external'), fou()],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },

  after: {
    all: [(hook) => {
      return hook
    }],
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
