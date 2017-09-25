import createReducer from "../";

const api = {
  repos: {
    fetchRepos: {
      actions: {},
      select: new Function(),
      type: new Function(),
      fetch: new Function(),
      reducer: (state = 1, action) => state
    } as any
  }
};

it("should return reducer for api entry", () => {
  expect(createReducer(api.repos.fetchRepos)()).toEqual(1);
});

it("should combine flat api", () => {
  expect(createReducer(api.repos)()).toEqual({
    fetchRepos: 1
  });
});

it("should combine nested api", () => {
  expect(createReducer(api)()).toEqual({
    repos: {
      fetchRepos: 1
    }
  });
});
