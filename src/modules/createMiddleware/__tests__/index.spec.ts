import { makeFakeApiEntry } from "../../../../helpers";
import createMiddleware from "../";

it('should call "next" with provided action, when dispatched non api action', () => {
  const store = void 0;
  const next = jest.fn();
  const action = { type: "test" };

  createMiddleware({
    fetchItems: makeFakeApiEntry("fetchItems")
  })(store)(next)(action);

  expect(next).toHaveBeenCalledWith(action);
});

it('should call "next" with provided action, when dispatched api action', () => {
  const api = {
    fetchItems: makeFakeApiEntry("fetchItems")
  };
  const store = void 0;
  const next = jest.fn();
  const action = api.fetchItems.actions.request();

  createMiddleware(api)(store)(next)(action);

  expect(next).toHaveBeenCalledWith(action);
});

it('should call "fetch" entry function with request payload', () => {
  const api = {
    fetchItems: {
      ...makeFakeApiEntry("fetchItems"),
      fetch: jest.fn()
    }
  };
  const store = void 0;
  const next = () => {};
  const action = api.fetchItems.actions.request({ params: "params" });

  createMiddleware(api)(store)(next)(action);

  expect(api.fetchItems.fetch.mock.calls[0][2]).toEqual({ params: "params" });
});

it('should call "next" with success action', () => {
  const api = {
    fetchItems: {
      ...makeFakeApiEntry("fetchItems"),
      fetch: onSuccess => onSuccess("body", "meta")
    }
  };
  const store = void 0;
  const next = jest.fn();
  const action = api.fetchItems.actions.request();

  createMiddleware(api)(store)(next)(action);

  expect(next).toHaveBeenLastCalledWith(
    api.fetchItems.actions.success({
      body: "body",
      meta: "meta",
      request: action.payload
    })
  );
});

it('should call "next" with failure action', () => {
  const api = {
    fetchItems: {
      ...makeFakeApiEntry("fetchItems"),
      fetch: (_, onFailure) => onFailure("message", "body", "meta")
    }
  };
  const store = void 0;
  const next = jest.fn();
  const action = api.fetchItems.actions.request();

  createMiddleware(api)(store)(next)(action);

  expect(next).toHaveBeenLastCalledWith(
    api.fetchItems.actions.failure({
      message: "message",
      body: "body",
      meta: "meta",
      request: action.payload
    })
  );
});
