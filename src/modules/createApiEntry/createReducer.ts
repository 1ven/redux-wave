import { curry, equals, partition, compose, prop, whereEq } from "ramda";
import { initialTo, hasIntersection } from "../../utils";
import { Constants } from "./createConstants";
import { RequestPayload } from "./createActions";

export type ItemState = {
  isFetching: boolean;
  request?: RequestPayload;
  lastUpdated?: number;
  error?: string;
  data?: any;
};

export type Reducer = (state: ItemState[], action) => ItemState[];

export const updateState = (cb, cond, state) => {
  const predicate = typeof cond === "function" ? cond : hasIntersection(cond);
  const [items, rest] = partition(compose(predicate, prop("request")), state);

  return [...rest, ...initialTo([{ isFetching: false }], items).map(cb)];
};

/**
 * Creates reducer, which handles async actions for specific item
 * 
 * @param constants Async constants
 */
export default ({ request, success, failure }: Constants) => (
  state: ItemState[] = [],
  action
) => {
  switch (action.type) {
    case request:
      return updateState(
        item => ({
          ...item,
          isFetching: true,
          request: action.payload
        }),
        equals(action.payload),
        state
      );
    case success:
      return updateState(
        item => ({
          ...item,
          isFetching: false,
          lastUpdated: action.payload.meta.receivedAt,
          error: void 0,
          data: action.payload.body
        }),
        equals(action.payload.request),
        state
      );
    case failure:
      return updateState(
        item => ({
          ...item,
          isFetching: false,
          error: action.payload.message
        }),
        equals(action.payload.request),
        state
      );
    default:
      return state;
  }
};
