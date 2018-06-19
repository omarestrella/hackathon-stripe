import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['application-view'],

  stripe: inject(),

  submit: () => {},

  _newToken: null,

  actions: {
    saveToken() {
      const token = this.get('_newToken');
      if (token) {
        this.get('stripe').saveToken(token);
        this.get('submit')();
      }
    }
  },

  haveToken: computed('stripe.token', function () {
    return !!this.get('stripe.token');
  })
});
