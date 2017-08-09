import { isNil, is, compose, filter, split, path } from "ramda";
import * as isPlainObject from "is-plain-object";
import { resolvePath } from "../../utils";
import createApiEntry, {
  ApiEntry,
  SpecEntry,
  SpecEntryConfig,
  isApiEntry
} from "../createApiEntry";
import mapSpec from "./mapSpec";

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
export type FlatApi = {
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

export default (
  spec: Spec,
  specEntryConfig: SpecEntryConfig,
  specConfig?: SpecConfig
) =>
  mapSpec(spec, (entry: SpecEntry, path: string) =>
    createApiEntry(
      mergeConfig(entry, specEntryConfig),
      handleSpecConfig(
        {
          context: "",
          selector: <T>(state: T) => state,
          ...specConfig
        },
        path
      )
    )
  );

const pathToSelector = compose(path, filter(x => !!x), split("/"));

const handleSpecConfig = (c: SpecConfig, path: string) => {
  return {
    ...c,
    context: resolvePath(c.context, path),
    selector: compose(pathToSelector(path), c.selector)
  };
};

const mergeConfig = (entry: SpecEntry, config: SpecEntryConfig) => {
  return {
    ...entry,
    config: entry.config || config
  };
};
