import { makeFakeApiEntry } from "../../../../helpers";
import flattenSingleApi from "../flattenSingleApi";

it("should flatten api instance", () => {
  const api = {
    repos: {
      fetch: makeFakeApiEntry("fetchRepos")
    },
    issues: {
      key: {
        nested: {
          fetch: makeFakeApiEntry("fetchIssues")
        }
      }
    }
  };

  expect(flattenSingleApi(api)).toEqual({
    "fetchRepos/request": api.repos.fetch,
    "fetchIssues/request": api.issues.key.nested.fetch
  });
});

it("should throw an Error, when apis are having entries with the same request type", () => {
  expect(() =>
    flattenSingleApi({
      api: {
        repos: {
          fetchRepos: makeFakeApiEntry("fetchRepos"),
          fetchRepos2: makeFakeApiEntry("fetchRepos")
        }
      }
    })
  ).toThrowError("Apis are having entries with the same path - fetchRepos");
});
