import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  store: inject(),

  account: null,
  subscription: null,

  showEditModal: false,
  showDeleteConfirmation: false,

  actions: {
    showEditModal() {
      this.set('showEditModal', true);
    },

    showDeleteConfirmation() {
      this.set('showDeleteConfirmation', true);
    }
  },

  plan: computed.reads('subscription.plan'),
  name: computed.reads('subscription.name'),
  pricing: computed.reads('subscription.pricing')
});
