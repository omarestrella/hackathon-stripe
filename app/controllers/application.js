import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  routeClass: computed('currentRouteName', function () {
    return this.get('currentRouteName').replace(/\./g, '-');
  })
});
