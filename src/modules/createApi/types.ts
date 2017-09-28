import { is } from "ramda";
import * as isPlainObject from "is-plain-object";
import { Caller } from "./createApiCaller";
import { Actions } from "./createActions";

export type Settings = {
  context?: string;
  selector?: <S, T>(state: S) => S | T;
};

export type Spec = {
  [key: string]: SpecEntry | Spec;
};

export type Api = {
  [key: string]: ApiEntry | Api;
};

type FlatApi = {
  [key: string]: ApiEntry;
};

export const isFlatApi = (val: any): val is FlatApi => {
  if (!isPlainObject(val)) {
    return false;
  }

  for (let key in val) {
    if (!isApiEntry(val[key])) {
      return false;
    }
  }

  return true;
};

export type SpecEntry = {
  path: string;
  method: string;
  config?: QueryConfig;
};

export type Enhancer = (entry: ApiEntry) => ApiEntry;

export type HeadersObj = Record<string, string>;
export type HeadersFn = () => HeadersObj;
export type Headers = HeadersObj | HeadersFn;

export type QueryConfig = {
  endpoint: string;
  enhancers?: Enhancer[];
  headers?: Headers;
};

export type ApiEntry = {
  select: (key: string) => (state, props) => any;
  type: (key: "request" | "success" | "failure") => string;
  reducer: (state, action) => typeof state;
  fetch: Caller;
  actions: Actions;
};

export const isSpecEntry = (val: any): val is SpecEntry => {
  return isPlainObject(val) && is(String, val.path) && is(String, val.method);
};

export const isApiEntry = (val: any): val is ApiEntry => {
  return (
    isPlainObject(val) &&
    isPlainObject(val.actions) &&
    isFunction(val.select) &&
    isFunction(val.type) &&
    isFunction(val.reducer) &&
    isFunction(val.fetch)
  );
};

const isFunction = val => typeof val === "function";
