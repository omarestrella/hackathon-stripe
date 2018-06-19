import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  email: attr(),
  created: attr(),
  account_balance: attr(),
  description: attr(),

  shipping: attr(),

  default_source: attr(),

  sources: hasMany('source'),
  subscriptions: hasMany('subscription'),

  name: computed.reads('description'),
  phone: computed.reads('shipping.phone'),

  cards: computed('sources.@each.funding', function () {
    return this.get('sources').filterBy('funding', 'credit');
  }),

  defaultCard: computed('cards.@each.id', 'default_source', function () {
    return this.get('cards').findBy('id', this.get('default_source'));
  })
});
