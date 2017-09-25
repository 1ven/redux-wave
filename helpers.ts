export const makeFakeApiEntry = type => {
  const state = {
    isFetching: false,
    lastUpdated: 1,
    data: "test"
  };

  return {
    actions: {
      request: payload => ({
        type: type + "/request",
        payload
      }),
      success: payload => ({
        type: type + "/success",
        payload
      }),
      failure: payload => ({
        type: type + "/failure",
        payload
      })
    },
    select: key => () => state[key],
    fetch: () => void 0,
    reducer: () => state,
    type: key =>
      ({
        request: type + "/request",
        success: type + "/success",
        failure: type + "/failure"
      }[key])
  } as any;
};
