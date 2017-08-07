import { compose, prop } from "ramda";

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
