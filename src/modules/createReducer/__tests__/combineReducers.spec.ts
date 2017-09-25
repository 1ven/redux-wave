import { identity } from "ramda";
import combineReducers from "../combineReducers";

it("should return initialState", () => {
  const a = (state = 1, action) => state;
  const b = (state = 2, action) => state;

  expect(
    combineReducers({
      a,
      b
    })()
  ).toEqual({
    a: 1,
    b: 2
  });
});

it("should pass state to corresponding reducers", () => {
  expect(
    combineReducers({
      a: identity,
      b: identity
    })(
      {
        a: "value",
        b: "another value"
      },
      void 0
    )
  ).toEqual({
    a: "value",
    b: "another value"
  });
});

it("should pass action to all reducers", () => {
  const a = (state = 1, action) => action.payload + state;
  const b = (state = 2, action) => action.payload + state;

  expect(
    combineReducers({
      a,
      b
    })(void 0, {
      type: "test",
      payload: 1
    })
  ).toEqual({
    a: 2,
    b: 3
  });
});
