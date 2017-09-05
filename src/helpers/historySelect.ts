import { last } from "ramda";
import { ApiEntry } from "../modules/createApiEntry";
import { hasIntersection } from "../utils";

// TODO: make condition requred param
export default (entry: ApiEntry, prop: string, condition?) => (
  state,
  props
) => {
  const list = entry.selector(state, props);
  const item = !condition
    ? last(list)
    : list.find(
        item =>
          typeof condition(props) === "function"
            ? condition(props)(item.request)
            : hasIntersection(condition(props), item.request)
      );
  return item && item[prop];
};
