import { ApiEntry } from "../createApi/types";

/**
 * Throws an exception, related to keys duplication
 * 
 * @param entry Duplicated api entry
 */
export default (entry: ApiEntry) => {
  throw new Error(
    `Apis are having entries with the same path - ${entry
      .type("request")
      .replace(/\/request/, "")}`
  );
};
