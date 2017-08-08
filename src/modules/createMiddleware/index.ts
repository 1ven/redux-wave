import { Api } from "../createApi";
import flattenApis from "./flattenApis";

/**
 * Middleware, which listens request actions and makes api requests
 * 
 * @param apis Apis instances
 */
export default (...apis: Api[]) => {
  const flattened = flattenApis(apis);

  return store => next => action => {
    const { type, payload } = action;
    const entry = flattened[type];

    if (typeof entry === "undefined") {
      return next(action);
    }

    next(action);

    entry.call(
      (body, meta) =>
        next(entry.actions.success({ body, meta, request: payload })),
      (message: string, body?, meta?) =>
        next(entry.actions.failure({ body, meta, message, request: payload })),
      payload
    );
  };
};
