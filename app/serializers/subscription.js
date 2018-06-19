import Application from './application';
import EmbeddedRecordsMixin from 'ember-data/serializers/embedded-records-mixin';

export default Application.extend(EmbeddedRecordsMixin, {
  attrs: {
    plan: {
      embedded: 'always'
    }
  }
});
