import RESTAdapter from 'ember-data/adapters/rest';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default RESTAdapter.extend({
  host: 'https://api.stripe.com',
  namespace: 'v1',

  stripe: inject(),

  headers: computed(function() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${this.get('stripe.token')}`
    };
  }),

  ajaxOptions(url, type, options) {
    if (type === 'PUT') {
      type = 'POST';
    }

    options = this._super(url, type, options);

    // HACK IT IN
    const data = typeof options.data === 'string' ? JSON.parse(options.data) : options.data;
    if (type === 'POST') {
      options.data = `default_source=${data.default_source}`;
      options.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    return options;
  }
});
