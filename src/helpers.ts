import { curry, T } from "ramda";
import { ApiEntry } from "./modules/createApiEntry";
import {
  RequestPayload,
  SuccessPayload,
  FailurePayload
} from "./modules/createApiEntry/createActions";

export const request = (entry: ApiEntry, payload: RequestPayload) =>
  entry.actions.request(payload);

export const success = (entry: ApiEntry, payload: SuccessPayload) =>
  entry.actions.success(payload);

export const failure = (entry: ApiEntry, payload: FailurePayload) =>
  entry.actions.failure(payload);

export const select = (entry: ApiEntry, prop: string, cond?) => (
  state,
  props
) => entry.selectors[prop](cond)(state, props);

export const type = curry(
  (entry: ApiEntry, type: "request" | "success" | "failure") =>
    entry.constants[type]
);
