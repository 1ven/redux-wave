import { Api } from "../createApi/types";
import flattenApis from "./flattenApi";

/**
 * Middleware, which listens request actions and makes api requests
 * 
 * @param apis Apis instances
 */
export default (...apis: Api[]) => {
  const flattened = flattenApis(apis);

  return store => next => action => {
    const entry = flattened[action.type];
    const { payload } = action;

    if (typeof entry === "undefined") {
      return next(action);
    }

    next(action);

    entry.fetch(
      (body, meta) =>
        next(entry.actions.success({ body, meta, request: payload })),
      (message: string, body?, meta?) =>
        next(entry.actions.failure({ body, meta, message, request: payload })),
      payload
    );
  };
};
