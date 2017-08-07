import { isNil, is, compose, filter, split, path } from "ramda";
import * as isPlainObject from "is-plain-object";
import createApiEntry, { ApiEntry } from "./createApiEntry";
import mapSpec from "./mapSpec";

export type SpecEntryConfig = {
  endpoint: string;
};

export type SpecConfig = {
  context?: string;
  selector?: <S, T>(state: S) => S | T;
};

export type Spec = {
  [key: string]: SpecEntry | Spec;
};
export type Api = {
  [key: string]: ApiEntry | Api;
};

export type SpecEntry = {
  url: string;
  method: string;
  config?: SpecEntryConfig;
};

export const isSpecEntry = (val: any): val is SpecEntry => {
  return isPlainObject(val) && is(String, val.url) && is(String, val.method);
};

export default (
  spec: Spec,
  specEntryConfig: SpecEntryConfig,
  specConfig: SpecConfig = {
    context: "",
    selector: <T>(state: T) => state
  }
) =>
  mapSpec(spec, (entry: SpecEntry, path: string) =>
    createApiEntry(
      mergeConfig(entry, specEntryConfig),
      handleSpecConfig(specConfig, path)
    )
  );

const pathToSelector = compose(path, filter(x => !!x), split("/"));

const handleSpecConfig = (c: SpecConfig, path: string) => {
  return {
    ...c,
    context: c.context + "/" + path,
    selector: compose(pathToSelector(path), c.selector)
  };
};

const mergeConfig = (entry: SpecEntry, config: SpecEntryConfig) => {
  return {
    ...entry,
    config: entry.config || config
  };
};
