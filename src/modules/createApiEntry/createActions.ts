import { mapObjIndexed, pick } from "ramda";
import { Constants } from "./createConstants";
import { Meta } from "./createApiCaller";

export type RequestAction = {
  type: string;
  payload?: RequestPayload;
};
export type RequestPayload = {
  params?: Record<string, string | number>;
  body?: any;
};

export type SuccessAction = {
  type: string;
  payload: SuccessPayload;
};
export type SuccessPayload = {
  meta: Meta;
  request?: RequestPayload;
  body?: any;
};

export type FailureAction = {
  type: string;
  payload: FailurePayload;
};
export type FailurePayload = {
  message: string;
  meta?: Meta;
  request?: RequestPayload;
  body?: any;
};

export type Actions = {
  request: (p?: RequestPayload) => RequestAction;
  success: (p: SuccessPayload) => SuccessAction;
  failure: (p: FailurePayload) => FailureAction;
};

const payloadSpec = {
  request: pick(["params", "body"]),
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
