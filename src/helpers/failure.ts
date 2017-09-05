import { ApiEntry } from "../modules/createApiEntry";
import { FailurePayload } from "../modules/createApiEntry/createActions";

export default (entry: ApiEntry, payload: FailurePayload) =>
  entry.actions.failure(payload);
