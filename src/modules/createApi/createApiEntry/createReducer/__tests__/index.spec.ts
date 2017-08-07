import createConstants from "../../createConstants";
import createActions from "../../createActions";
import createReducer from "../";

test("should create reducer with initial state", () => {
  const constants = createConstants("context");
  const reducer = createReducer(constants);

  expect(reducer(void 0, { type: "test" })).toEqual({
    isFetching: false
  });
});

test("should create reducer which handles request action", () => {
  const constants = createConstants("context");
  const reducer = createReducer(constants);
  const actions = createActions(constants);

  expect(reducer(void 0, actions.request())).toEqual({
    isFetching: true
  });
});

test("should create reducer which handles success action", () => {
  const constants = createConstants("context");
  const reducer = createReducer(constants);
  const actions = createActions(constants);

  expect(
    reducer(
      { isFetching: true },
      actions.success({
        meta: {
          receivedAt: 1,
          status: 200
        },
        body: "test"
      })
    )
  ).toEqual({
    isFetching: false,
    lastUpdated: 1,
    data: "test"
  });
});

test("should create reducer which handles failure action", () => {
  const constants = createConstants("context");
  const reducer = createReducer(constants);
  const actions = createActions(constants);

  expect(
    reducer(
      { isFetching: true },
      actions.failure({
        meta: {
          receivedAt: 1,
          status: 200
        },
        message: "test"
      })
    )
  ).toEqual({
    isFetching: false,
    error: "test"
  });
});
