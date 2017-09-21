import { useWith, keys, compose, head, intersection } from "ramda";
import * as types from "../createApi/types";
import flattenEntry from "./flattenEntry";
import throwException from "./throwException";

/**
 * Transforms nested api objects list to plain object with request action type
 * as key
 * 
 * @param api Apis instances list
 */
export default (apis: types.Api[]) => {
  let temp = {};

  return (function traverse(apis: types.Api[]) {
    if (apis.length === 1) {
      const flatApi = flattenEntry(apis[0]);
      const key = getDuplicateKey(temp, flatApi);

      if (key) {
        throwException(temp[key]);
      }

      temp = { ...temp, flatApi };

      return flatApi;
    }

    return {
      ...traverse(apis.slice(0, 1)),
      ...traverse(apis.slice(1))
    };
  })(apis);
};

/**
 * @param obj Plain object
 * @returns List of sorted keys of an object
 */
type _keysSorted = (obj) => string[];
const keysSorted = <_keysSorted>compose(arr => arr.sort(), keys);

/**
 * @param a left object
 * @param b right object
 * @returns First duplicated key in two given objects
 */
type _getDuplicateKey = (a, b) => string;
const getDuplicateKey = <_getDuplicateKey>compose(
  head,
  useWith(intersection, [keysSorted, keysSorted])
);
