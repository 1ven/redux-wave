import createSelectors from "../";

test("should create isFetching selector", () => {
  const { isFetching } = createSelectors(state => state.a.b);

  expect(isFetching({ a: { b: { isFetching: "test" } } })).toBe("test");
});

test("should create lastUpdated selector", () => {
  const { lastUpdated } = createSelectors(state => state.a.b);

  expect(lastUpdated({ a: { b: { lastUpdated: "test" } } })).toBe("test");
});

test("should create data selector", () => {
  const { data } = createSelectors(state => state.a.b);

  expect(data({ a: { b: { data: "test" } } })).toBe("test");
});

test("should create error selector", () => {
  const { error } = createSelectors(state => state.a.b);

  expect(error({ a: { b: { error: "test" } } })).toBe("test");
});
