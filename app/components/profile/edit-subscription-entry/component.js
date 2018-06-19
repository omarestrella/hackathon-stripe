import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  customer: null,
  subscription: null,

  actions: {
    changeDefaultCard(event) {
      const customer = this.get('customer');
      customer.set('default_source', event.target.value);
      customer.save();
    }
  },

  currentCard: computed.reads('customer.defaultCard'),
});
