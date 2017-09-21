import { omit } from "ramda";
import * as types from "../createApi/types";
import throwException from "./throwException";

/**
 * Transforms nested api object to plain object with request action type as
 * keys
 * 
 * @param api Api instance
 */
export default function flattenSingleApi(api: types.Api) {
  let temp = {};

  return (function traverse(api: types.Api) {
    if (types.isFlatApi(api)) {
      return mapKeys(api, (entry: types.ApiEntry) => {
        const key = entry.type("request");

        if (!!temp[key]) {
          throwException(entry);
        }

        temp[key] = entry;

        return key;
      });
    }

    if (isSingleObject(api)) {
      return traverse(selectSingleValue(api));
    }

    return {
      ...traverse(head(api)),
      ...traverse(tail(api))
    };
  })(api);
}

function mapKeys(obj, cb: (val, key: string) => string) {
  let result = {};

  for (let key in obj) {
    result[cb(obj[key], key)] = obj[key];
  }

  return result;
}

function headKey(obj) {
  return Object.keys(obj).sort()[0];
}

function head(obj) {
  const key = headKey(obj);
  return {
    [key]: obj[key]
  };
}

function tail(obj) {
  return omit([headKey(obj)], obj);
}

function isSingleObject(obj) {
  return Object.keys(obj).length === 1;
}

function selectSingleValue(obj) {
  return obj[headKey(obj)];
}
