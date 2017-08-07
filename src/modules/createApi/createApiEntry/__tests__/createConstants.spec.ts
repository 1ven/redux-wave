import createConstants from "../createConstants";

test("should create 3 api constants", () => {
  expect(createConstants("context")).toEqual({
    request: "context/request",
    success: "context/success",
    failure: "context/failure"
  });
});
