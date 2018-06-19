import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
  normalizeFindRecordResponse(store, modelClass, payload, id, requestType) {
    const data = {
      [modelClass.modelName]: payload
    }

    return this._super(store, modelClass, data, id, requestType);
  }
});
