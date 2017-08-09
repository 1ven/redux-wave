import { mapObjIndexed } from "ramda";
import { FlatApi } from "../createApi";
import { ApiEntry } from "../createApiEntry";

/**
 * Combines reducers object into one single reducer
 * 
 * @param spec Object with 1 level nesting, which has reducers as values
 */
export default spec => (state = {}, action = {}) =>
  mapObjIndexed(
    (reducer: any, key: string) => reducer(state[key], action),
    spec
  );
