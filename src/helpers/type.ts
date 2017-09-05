import { curry } from "ramda";
import { ApiEntry } from "../modules/createApiEntry";

export default curry(
  (entry: ApiEntry, type: "request" | "success" | "failure") =>
    entry.constants[type]
);
