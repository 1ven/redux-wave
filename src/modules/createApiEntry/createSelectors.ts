import { compose, prop } from "ramda";

export type Selectors = {
  isFetching: Function;
  lastUpdated: Function;
  data: Function;
  error: Function;
};

/**
 * Creates selectors object for api entry
 * 
 * @param selector api entry selector
 */
export default selector => ({
  isFetching: compose(prop("isFetching"), selector),
  lastUpdated: compose(prop("lastUpdated"), selector),
  data: compose(prop("data"), selector),
  error: compose(prop("error"), selector)
});
