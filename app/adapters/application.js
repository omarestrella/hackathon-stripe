import RESTAdapter from 'ember-data/adapters/rest';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default RESTAdapter.extend({
  host: 'https://api.stripe.com',
  namespace: 'v1',

  stripe: inject(),

  headers: computed(function() {
    return {
      Authorization: `bearer ${this.get('stripe.token')}`
    };
  })
});
