import mergeReducers from "../mergeReducers";

test("should use first reducer state as initial state", () => {
  const a = (state = 1, action) => state;
  const b = (state = 2, action) => state;
  const c = (state = 3, action) => state;
  const result = mergeReducers(a, b, c);

  expect(result(void 0, {})).toBe(1);
});

test("should use next reducer state as initial state, if prev reducer state is undefined", () => {
  const a = (state, action) => state;
  const b = (state = 2, action) => state;
  const c = (state = 3, action) => state;
  const result = mergeReducers(a, b, c);

  expect(result(void 0, {})).toBe(2);
});

test("should handle action in all reducers", () => {
  const a = (state = 1, action) => {
    if (action.type === "test") return state + 1;
    return state;
  };
  const b = (state, action) => {
    if (action.type === "test") return state + "a";
    return state;
  };
  const result = mergeReducers(a, b);

  expect(result(void 0, { type: "test" })).toBe("2a");
});
