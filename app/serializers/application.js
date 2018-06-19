import RESTSerializer from 'ember-data/serializers/rest';

function normalizeData(data) {
  if (data.subscriptions) {
    data.subscriptions = data.subscriptions.data;
  }
  if (data.sources) {
    data.sources = data.sources.data;
  }
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
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    Object.assign(hash, this.serialize(snapshot, options));
  },
});
