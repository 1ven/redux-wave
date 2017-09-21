import * as isPlainObject from "is-plain-object";
import { resolvePath } from "../../utils";
import * as types from "./types";
import * as utils from "./utils";
import createApiCaller, { Caller } from "./createApiCaller";
import createConstants, { Constants } from "./createConstants";
import createReducer, { Reducer } from "./createReducer";
import createActions, { Actions } from "./createActions";

export default (
  spec: types.Spec,
  queryConfig: types.QueryConfig,
  settings?: types.Settings
) =>
  utils.mapSpec(spec, (entry: types.SpecEntry, entryPath: string) => {
    const { path, config, method } = utils.entryDefaults(entry, queryConfig);
    const { selector, context } = utils.settingsDefaults(settings, entryPath);
    const constants = createConstants(context);

    return {
      select: utils.createSelect(selector),
      type: utils.createType(constants),
      fetch: createApiCaller(resolvePath(config.endpoint, path), method),
      reducer: createReducer(constants),
      actions: createActions(constants)
    };
  });
