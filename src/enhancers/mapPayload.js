export default spec => {
  const { request, success, failure } = merge({ 
    request: identity,
    success: identity,
    failure: identity,
  }, spec);

  return apiEntry => ({
    ...apiEntry,
    actions: {
      request: mapActionPayload('request', request, apiEntry),
      success: mapActionPayload('success', success, apiEntry),
      failure: mapActionPayload('failure', failure, apiEntry),
    }
  })
}

const mapActionPayload = (type, mapper, entry) => (payload) => {
  const action = entry.actions[type](payload);
  return ({
    ...action,
    payload: mapper(action.payload)
  });
}