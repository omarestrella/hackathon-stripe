import RESTSerializer from 'ember-data/serializers/rest';

function normalizeData(data) {
  data.subscriptions = data.subscriptions.data;
  data.sources = data.sources.data;
  return data;
}

export default RESTSerializer.extend({
  normalizeFindRecordResponse(store, modelClass, payload, id, requestType) {
    const data = {
      [modelClass.modelName]: normalizeData(payload)
    };

    return this._super(store, modelClass, data, id, requestType);
  },

  normalizeFindAllResponse(store, modelClass, payload, id, requestType) {
    const data = {
      [modelClass.modelName]: payload.data.map(data => normalizeData(data))
    };

    return this._super(store, modelClass, data, id, requestType);
  }
});
