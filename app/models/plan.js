import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  amount: attr(),
  interval: attr(),
  interval_count: attr(),

  product: attr()
});
