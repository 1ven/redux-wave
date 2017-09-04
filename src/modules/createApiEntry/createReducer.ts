import { equals, partition, compose, prop } from "ramda";
import { Constants } from "./createConstants";
import { RequestPayload } from "./createActions";

export type EntryState = {
  isFetching: boolean;
  request?: RequestPayload;
  lastUpdated?: number;
  error?: string;
  data?: any;
};

// export type Reducer = (state: State, action) => State;

const updateState = (cb, pred: (p: RequestPayload) => boolean, state) => {
  const [[entry = { isFetching: false }], rest] = partition(
    compose(pred, prop("request")),
    state
  );
  return [...rest, cb(entry)];
};

updateState(cb, equals(payload), state);

// const list = ({ request, success, failure }) => (state: State[], action) => {
//   switch (action.type) {
//     case request:
//     case success:
//     case failure:
//     default: return state;
//   }
// }

/**
 * Creates reducer, which handles async actions for specific entry
 * 
 * @param constants Async constants
 */
export default ({ request, success, failure }: Constants) => (
  state: EntryState[] = [],
  action
) => {
  switch (action.type) {
    case request:
      return {
        ...state,
        isFetching: true,
        request: action.payload
      };
    case success:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.payload.meta.receivedAt,
        error: void 0,
        data: action.payload.body
      };
    case failure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      };
    default:
      return state;
  }
};
