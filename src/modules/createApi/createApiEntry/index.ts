import { is } from "ramda";
import * as isPlainObject from "is-plain-object";
import { SpecConfig } from "../";
import createActions, { Actions } from "./createActions";
import createApiCaller, { Caller } from "./createApiCaller";
import createConstants, { Constants } from "./createConstants";
import createReducer, { Reducer } from "./createReducer";
import createSelectors, { Selectors } from "./createSelectors";

export type SpecEntry = {
  url: string;
  method: string;
  config?: SpecEntryConfig;
};

export type SpecEntryConfig = {
  endpoint: string;
};

export type ApiEntry = {
  constants: Constants;
  actions: Actions;
  call: Caller;
  reducer: Reducer;
  selectors: Selectors;
};

export const isSpecEntry = (val: any): val is SpecEntry => {
  return isPlainObject(val) && is(String, val.url) && is(String, val.method);
};

export const isApiEntry = (val: any): val is ApiEntry => {
  return (
    isPlainObject(val) &&
    isPlainObject(val.constants) &&
    isPlainObject(val.actions) &&
    isPlainObject(val.selectors) &&
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
  const selectors = createSelectors(specConfig.selector);
  const actions = createActions(constants);
  const reducer = createReducer(constants);
  const call = createApiCaller(entry);

  return {
    constants,
    selectors,
    actions,
    reducer,
    call
  };
};
