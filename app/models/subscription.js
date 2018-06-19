import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { belongsTo } from 'ember-data/relationships';

import pluralize from 'ember-inflector';

export default Model.extend({
  current_period_start: attr(),
  current_period_end: attr(),

  plan: belongsTo('plan'),
  customer: belongsTo('customer'),

  name: computed('plan.productModel', async function () {
    const plan = await this.get('plan');
    const product = await this.get('store').find('product', plan.get('product'));
    return product.get('name');
  }),

  pricing: computed('plan.interval', async function () {
    const plan = await this.get('plan');
    const amount = plan.get('amount') / 100;
    const count = plan.get('interval_count');
    const interval = count > 1 ? pluralize(plan.get('interval')) : plan.get('interval');

    if (count === 1) {
      return `$${amount} every ${interval}`;
    }
    return `$${amount} every ${count} ${interval}`;
  })
});
