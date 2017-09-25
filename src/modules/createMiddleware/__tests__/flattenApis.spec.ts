import { makeFakeApiEntry } from "../../../../helpers";
import flattenApis from "../flattenApis";

it("should flatten apis list", () => {
  const apis = [
    {
      issues: {
        key: {
          nested: {
            fetch: makeFakeApiEntry("fetchIssues")
          }
        }
      }
    },
    {
      tweets: {
        fetch: makeFakeApiEntry("fetchTweets")
      }
    }
  ];

  expect(flattenApis(apis)).toEqual({
    "fetchIssues/request": apis[0].issues.key.nested.fetch,
    "fetchTweets/request": apis[1].tweets.fetch
  });
});

it("should throw an Error, when apis are having entries with the same request type", () => {
  expect(() =>
    flattenApis([
      {
        issues: {
          fetch: makeFakeApiEntry("fetchIssues")
        }
      },
      {
        tweets: {
          fetch: makeFakeApiEntry("fetchIssues")
        }
      }
    ])
  ).toThrowError("Apis are having entries with the same path - fetchIssues");
});
