import { map } from "ramda";
import { Constants } from "./createConstants";

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
  receivedAt: number;
  request?: RequestPayload;
  data?: any;
};

export type FailureAction = {
  type: string;
  payload: FailurePayload;
};
export type FailurePayload = {
  message: string;
};

/**
 * Creates 3 async action creators
 * 
 * @param constants async actions constants
 */
export default (
  constants: Constants
): {
  request: (p?: RequestPayload) => RequestAction;
  success: (p: SuccessPayload) => SuccessAction;
  failure: (p: FailurePayload) => FailureAction;
} =>
  map(
    (type: string) => payload => ({
      type,
      payload
    }),
    constants
  );
