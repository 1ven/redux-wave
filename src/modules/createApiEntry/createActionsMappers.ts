import * as actions from "./createActions";
import { SpecEntry } from "./";

export type MapPayload = {
  request?: <T>(p: actions.RequestPayload) => T;
  success?: <T>(p: actions.SuccessPayload) => T;
  failure?: <T>(p: actions.FailurePayload) => T;
};

export type MapActions = {
  request?: <T>(p: actions.RequestAction) => T;
  success?: <T>(p: actions.SuccessAction) => T;
  failure?: <T>(p: actions.FailureAction) => T;
};

const makeActionMapper = fn => action => ({
  ...action,
  payload: fn(action.payload)
});

export default (mapPayload: MapPayload) => ({
  request: makeActionMapper(mapPayload.request),
  success: makeActionMapper(mapPayload.success),
  failure: makeActionMapper(mapPayload.failure)
});
