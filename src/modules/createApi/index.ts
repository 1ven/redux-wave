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
  utils.mapSpec(spec, (_specEntry: types.SpecEntry, entryPath: string) => {
    const specEntry = utils.entryDefaults(_specEntry, queryConfig);
    const { path, config, method } = specEntry;
    const { selector, context } = utils.settingsDefaults(settings, entryPath);
    const constants = createConstants(context);

    return utils.applyEnhancers(config.enhancers, specEntry, {
      select: utils.createSelect(selector),
      type: utils.createType(constants),
      fetch: createApiCaller(
        resolvePath(config.endpoint, path),
        method,
        config.headers
      ),
      reducer: createReducer(constants),
      actions: createActions(constants)
    });
  });
