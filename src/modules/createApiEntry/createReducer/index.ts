import {
  RequestPayload,
  SuccessPayload,
  FailurePayload
} from "../createActions";
import { Constants } from "../createConstants";
import { SpecEntry } from "../";
import createHistoryReducer from "./historyReducer";
import createDefaultReducer from "./defaultReducer";

export type Reducer = (state, action) => any;

export default (constants: Constants, history: SpecEntry["history"]) =>
  history ? createHistoryReducer(constants) : createDefaultReducer(constants);

export const handlers = {
  request: (p: RequestPayload) => ({
    isFetching: true,
    request: p
  }),
  success: (p: SuccessPayload) => ({
    isFetching: false,
    lastUpdated: p.meta.receivedAt,
    error: void 0,
    data: p.body
  }),
  failure: (p: FailurePayload) => ({
    isFetching: false,
    error: p.message
  })
};
