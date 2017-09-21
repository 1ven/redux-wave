import { mapSpec } from "../utils";

describe("mapSpec", () => {
  test("should deeply map spec object", () => {
    expect(
      mapSpec(
        {
          a: {
            b: {
              c: {
                url: "a",
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
            url: "a",
            method: "b"
          }
        },
        x: {
          y: {
            url: "a",
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
            url: "a",
            method: "b"
          }
        }
      },
      entry => {
        expect(entry).toEqual({
          url: "a",
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
            url: "a",
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
