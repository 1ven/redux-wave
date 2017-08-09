import createConstants from "../createConstants";
import createActions from "../createActions";

test("should create request action creator", () => {
  const constants = createConstants("context");
  const actions = createActions(constants);

  const payload = {
    params: {
      a: 1
    },
    body: {
      b: 1
    }
  };

  expect(actions.request(payload)).toEqual({
    type: constants.request,
    payload
  });
});

test("should create success action creator", () => {
  const constants = createConstants("context");
  const actions = createActions(constants);

  const payload = {
    meta: {
      receivedAt: 1,
      status: 200
    },
    body: "data"
  };

  expect(actions.success(payload)).toEqual({
    type: constants.success,
    payload
  });
});

test("should create failure action creator", () => {
  const constants = createConstants("context");
  const actions = createActions(constants);

  const payload = {
    meta: {
      receivedAt: 1,
      status: 200
    },
    message: "test",
    body: "error data"
  };

  expect(actions.failure(payload)).toEqual({
    type: constants.failure,
    payload
  });
});
