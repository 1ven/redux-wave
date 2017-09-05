import { compose, prop } from "ramda";
import { ApiEntry } from "../modules/createApiEntry";

export default (entry: ApiEntry, key: string) =>
  compose(prop(key), entry.selector);
