import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  email: attr(),
  created: attr(),
  account_balance: attr(),
  description: attr(),

  sources: hasMany('source'),
  subscriptions: hasMany('subscription'),

  name: computed.reads('description'),

  cards: computed('sources.@each.funding', function () {
    return this.get('sources').filterBy('funding', 'credit');
  })
});
