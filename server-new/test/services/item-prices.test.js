const assert = require('assert');
const app = require('../../src/app');

describe('\'itemPrices\' service', () => {
  it('registered the service', () => {
    const service = app.service('item-prices');

    assert.ok(service, 'Registered the service');
  });
});
