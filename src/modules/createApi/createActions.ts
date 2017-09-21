import { mapObjIndexed, pick } from "ramda";
import { Constants } from "./createConstants";
import { Meta } from "./createApiCaller";

export type RequestAction = {
  type: string;
  payload?: {
    params?: Record<string, string | number>;
    body?: any;
  };
};

export type SuccessAction = {
  type: string;
  payload: {
    meta: Meta;
    request?: RequestAction["payload"];
    body?: any;
  };
};

export type FailureAction = {
  type: string;
  payload: {
    message: string;
    meta?: Meta;
    request?: RequestAction["payload"];
    body?: any;
  };
};

export type Actions = {
  request: (p?: RequestAction["payload"]) => RequestAction;
  success: (p: SuccessAction["payload"]) => SuccessAction;
  failure: (p: FailureAction["payload"]) => FailureAction;
};

const payloadSpec = {
  request: pick(["params", "body", "meta"]),
  success: pick(["meta", "request", "body"]),
  failure: pick(["message", "meta", "request", "body"])
};

/**
 * Creates 3 async action creators
 * 
 * @param constants async actions constants
 */
export default (constants: Constants) =>
  mapObjIndexed(
    (type: string, key: string) => payload => ({
      type,
      payload: payload && payloadSpec[key](payload)
    }),
    constants
  ) as Actions;
