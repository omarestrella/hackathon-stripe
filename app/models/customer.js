import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  email: attr(),
  created: attr(),
  account_balance: attr(),
  description: attr()
});
