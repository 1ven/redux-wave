import { is } from "ramda";
import * as isPlainObject from "is-plain-object";
import { SpecConfig } from "../createApi";
import { mergeReducers } from "../../utils";
import createApiCaller, { Caller } from "./createApiCaller";
import createConstants, { Constants } from "./createConstants";
import createReducer, { Reducer } from "./createReducer";
import createActions, { Actions } from "./createActions";
import createActionsMappers, {
  MapPayload,
  MapActions
} from "./createActionsMappers";

export type SpecEntry = {
  url: string;
  method: string;
  history?: boolean;
  reducer?: Reducer;
  config?: SpecEntryConfig;
  mapPayload?: MapPayload;
};

export type SpecEntryConfig = {
  endpoint: string;
};

export type ApiEntry = {
  constants: Constants;
  actions: Actions;
  call: Caller;
  selector: any;
  mapActions: MapActions;
  reducer: SpecEntry["reducer"];
};

export const isSpecEntry = (val: any): val is SpecEntry => {
  return isPlainObject(val) && is(String, val.url) && is(String, val.method);
};

export const isApiEntry = (val: any): val is ApiEntry => {
  return (
    isPlainObject(val) &&
    isPlainObject(val.constants) &&
    isPlainObject(val.actions) &&
    is(Function, val.selector) &&
    is(Function, val.reducer) &&
    is(Function, val.call)
  );
};

/**
 * Creates api entry object
 * 
 * @param entry Entry object spec, defined by user
 * @param specConfig Global specs config
 */
export default (entry: SpecEntry, specConfig: SpecConfig): ApiEntry => {
  const constants = createConstants(specConfig.context);
  const actions = createActions(constants);
  const reducer = mergeReducers(
    createReducer(constants, entry.history),
    entry.reducer
  );
  const call = createApiCaller(entry);
  const mapActions = createActionsMappers(entry.mapPayload);

  return {
    selector: specConfig.selector,
    constants,
    actions,
    reducer,
    call,
    mapActions
  };
};
