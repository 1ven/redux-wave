import { mapObjIndexed } from "ramda";
import { Spec, SpecEntry, isSpecEntry } from "./";

/**
 * Recursively maps given spec object.
 *
 * @param spec Api spec object.
 * @param cb Callback, which will be called on SpecEntry value.
 * @param path Scope path of entry.
 * @return Returns new mapped spec.
 */
export default function mapSpec(
  spec: Spec,
  cb: (entry: SpecEntry, path: string) => any,
  path = ""
) {
  return mapObjIndexed(
    (val: SpecEntry | Spec, key: string) =>
      isSpecEntry(val)
        ? cb(val, mergePath(path, key))
        : mapSpec(val, cb, mergePath(path, key)),
    spec
  );
}

const mergePath = (path: string, key: string) => path + key + "/";
