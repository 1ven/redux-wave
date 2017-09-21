import { prop, map } from "ramda";
import combineReducers from "./combineReducers";
import * as types from "../createApi/types";

/**
 * Creates reducer based on given api
 *
 * @param api Api object instance
 */
export default function createReducer(api: types.Api) {
  if (types.isApiEntry(api)) {
    return api.reducer;
  }

  if (types.isFlatApi(api)) {
    return combineReducers(map(prop("reducer"), api));
  }

  return combineReducers(map(createReducer, api));
}
