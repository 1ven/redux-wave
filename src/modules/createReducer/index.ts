import { prop, map } from "ramda";
import combineReducers from "./combineReducers";
import { Api, isFlatApi } from "../createApi";
import { isApiEntry } from "../createApi/createApiEntry";

/**
 * Creates reducer based on given api
 *
 * @param api Api object instance
 */
export default function createReducer(api: Api) {
  if (isApiEntry(api)) {
    return api.reducer;
  }

  if (isFlatApi(api)) {
    return combineReducers(map(prop("reducer"), api));
  }

  return combineReducers(map(createReducer, api));
}
