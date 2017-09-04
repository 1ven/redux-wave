import { compose, prop, last } from "ramda";
import { hasIntersection } from "../../utils";

export type Selectors = {
  isFetching: Function;
  lastUpdated: Function;
  data: Function;
  request: Function;
  error: Function;
};

const get = (k: string, selector) => (condition?) => (state, props) => {
  const list = selector(state, props);
  const item = !condition
    ? last(list)
    : list.find(
        item =>
          typeof condition(props) === "function"
            ? condition(props)(item.request)
            : hasIntersection(condition(props), item.request)
      );
  return item && item[k];
};

/**
 * Creates selectors object for api entry
 * 
 * @param selector api entry selector
 */
export default selector => ({
  isFetching: get("isFetching", selector),
  lastUpdated: get("lastUpdated", selector),
  data: get("data", selector),
  request: get("request", selector),
  error: get("error", selector)
});
