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
    const entry = flattened[action.type];

    if (typeof entry === "undefined") {
      return next(action);
    }

    const mappedRequestAction = entry.mapActions.request(action);
    const { payload } = mappedRequestAction;

    next(mappedRequestAction);

    entry.call(
      (body, meta) =>
        next(
          entry.mapActions.success(
            entry.actions.success({ body, meta, request: payload })
          )
        ),
      (message: string, body?, meta?) =>
        next(
          entry.mapActions.failure(
            entry.actions.failure({ body, meta, message, request: payload })
          )
        ),
      payload
    );
  };
};
