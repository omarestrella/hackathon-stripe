import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  brand: attr(),
  exp_month: attr(),
  exp_year: attr(),
  last4: attr(),

  funding: attr(),
  object: attr(),
  type: attr()
});
