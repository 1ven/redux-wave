import { ApiEntry } from "../modules/createApiEntry";
import { SuccessPayload } from "../modules/createApiEntry/createActions";

export default (entry: ApiEntry, payload: SuccessPayload) =>
  entry.actions.success(payload);
