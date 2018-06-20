import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  stripe: inject(),
  application: inject(),

  beforeModel() {
    if (!this.get('stripe.token')) {
      this.replaceWith('index');
    }
  },

  model(params) {
    return this.store.find('customer', params.id).then(customer => {
      customer.set('name', this.get('application.person.name'));
      return customer;
    });
  },

  async afterModel(model) {
    const plans = await RSVP.all(model.get('subscriptions').map(sub => sub.get('plan')));
    await RSVP.all(plans.map(plan => this.store.find('product', plan.get('product'))));
  }
})
