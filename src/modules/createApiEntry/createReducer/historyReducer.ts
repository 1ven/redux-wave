import * as R from "ramda";
import { initialTo, hasIntersection } from "../../../utils";
import { Constants } from "../createConstants";
import { RequestPayload } from "../createActions";
import { handlers } from "./";

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
  const [items, rest] = R.partition(
    R.compose(predicate, R.prop("request")),
    state
  );

  return [...rest, ...initialTo([{ isFetching: false }], items).map(cb)];
};

const equalsBy = R.curry((groupBy, actionRequest, stateRequest) => {
  const arrayGroupBy = groupBy instanceof Array ? groupBy : [groupBy];
  const splitted = arrayGroupBy.map(R.split("."));
  return R.all(
    item => R.eqBy(R.path(item), actionRequest, stateRequest),
    splitted
  );
});

const groupBy = (p: RequestPayload) =>
  R.path(["history", "groupBy"], p) ||
  R.keys(R.pick(["params", "body"], p || {}));

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
          ...handlers.request(action.payload)
        }),
        equalsBy(groupBy(action.payload), action.payload),
        state
      );
    case success:
      return updateState(
        item => ({
          ...item,
          ...handlers.success(action.payload)
        }),
        equalsBy(groupBy(action.payload.request), action.payload.request),
        state
      );
    case failure:
      return updateState(
        item => ({
          ...item,
          ...handlers.failure(action.payload)
        }),
        equalsBy(groupBy(action.payload.request), action.payload.request),
        state
      );
    default:
      return state;
  }
};
