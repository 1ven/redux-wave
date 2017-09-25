import { mapObjIndexed, compose, filter, split, path, prop } from "ramda";
import { resolvePath } from "../../utils";
import { Constants } from "./createConstants";
import * as types from "./types";

/**
 * Recursively maps given spec object.
 *
 * @param spec Api spec object.
 * @param cb Callback, which will be called on SpecEntry value.
 * @param path Scope path of entry.
 * @return Returns new mapped spec.
 */
export function mapSpec(
  spec: types.Spec,
  cb: (entry: types.SpecEntry, path: string) => any,
  path = ""
) {
  return mapObjIndexed(
    (val: types.SpecEntry | types.Spec, key: string) =>
      types.isSpecEntry(val)
        ? cb(val, resolvePath(path, key))
        : mapSpec(val, cb, resolvePath(path, key)),
    spec
  );
}

export const pathToSelector = compose(path, filter(x => !!x), split("/"));

export const settingsDefaults = (s: types.Settings = {}, path: string) => {
  return {
    ...s,
    context: resolvePath(s.context || "", path),
    selector: compose(
      pathToSelector(path),
      s.selector || ((state: any) => state.api)
    )
  };
};

export const entryDefaults = (
  entry: types.SpecEntry,
  config: types.QueryConfig
) => {
  return {
    ...entry,
    config: entry.config || config
  };
};

export const createSelect = selector => (key: string) =>
  compose(prop(key), selector);

export const createType = (constants: Constants) => (key: string) =>
  constants[key];

export const applyEnhancers = (enhancers, specEntry, apiEntry) =>
  enhancers.reduce((acc, enhancer) => enhancer(acc, specEntry), apiEntry);
