import { mapObjIndexed } from "ramda";

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
