import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  current_period_start: attr(),
  current_period_end: attr(),

  plan: belongsTo('plan')
});
