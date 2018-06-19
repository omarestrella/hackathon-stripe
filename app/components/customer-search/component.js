import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import RSVP from 'rsvp';
import { debounce } from '@ember/runloop';

export default Component.extend({
  store: inject(),

  actions: {
    search(event) {
      debounce(this, this.set, 'query', event.target.value, 150);
    },

    showResults() {
      this.get('searchResults').then(results => {
        this.set('showResults', results.get('length') > 0);
      });
    },

    closeResults() {
      this.set('showResults', false);
    }
  },

  searchResults: computed('query', function () {
    const query = this.get('query');
    if (!query) {
      return RSVP.resolve([]);
    }

    return this.get('store')
      .findAll('customer')
      .then(customers => {
        return customers.filter(customer => {
          const description = customer.get('description');
          const email = customer.get('email');
          return email.indexOf(query) > -1 || description.indexOf(query) > -1;
        });
      });
  }),

  showResults: computed('searchResults.isFulfilled', 'query', {
    get() {
      return this.get('searchResults').then(results => {
        return results.get('length') > 0 && this.get('query.length') > 0;
      });
    },
    set(key, value) {
      return value;
    }
  })
});
