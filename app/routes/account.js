import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  stripe: inject(),

  beforeModel() {
    if (!this.get('stripe.token')) {
      this.replaceWith('index');
    }
  }
})
