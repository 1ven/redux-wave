import { mapSpec } from "../utils";

describe("mapSpec", () => {
  test("should deeply map spec object", () => {
    expect(
      mapSpec(
        {
          a: {
            b: {
              c: {
                path: "a",
                method: "b"
              }
            }
          }
        },
        () => "test"
      )
    ).toEqual({
      a: {
        b: {
          c: "test"
        }
      }
    });
  });

  test("should call callback on every entry", () => {
    const fn = jest.fn();
    mapSpec(
      {
        a: {
          b: {
            path: "a",
            method: "b"
          }
        },
        x: {
          y: {
            path: "a",
            method: "b"
          }
        }
      },
      fn
    );
    expect(fn).toHaveBeenCalledTimes(2);
  });

  test("should pass entry value to callback", () => {
    mapSpec(
      {
        a: {
          b: {
            path: "a",
            method: "b"
          }
        }
      },
      entry => {
        expect(entry).toEqual({
          path: "a",
          method: "b"
        });
      }
    );
  });

  test("should pass path value to callback", () => {
    mapSpec(
      {
        foo: {
          bar: {
            path: "a",
            method: "b"
          }
        }
      },
      (_, path) => {
        expect(path).toBe("foo/bar");
      }
    );
  });
});
