import AjaxService from 'ember-ajax/services/ajax';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default AjaxService.extend({
  application: inject(),

  trustedHosts: [
    /api.inindca.com/,
  ],

  headers: computed('application.accessToken', {
    get() {
      let headers = {};
      const authToken = this.get('application.accessToken');
      if (authToken) {
        headers.Authorization = `bearer ${authToken}`;
      }
      return headers;
    }
  })
})
