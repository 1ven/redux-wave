import { ApiEntry } from "../modules/createApiEntry";
import { RequestPayload } from "../modules/createApiEntry/createActions";

export default (entry: ApiEntry, payload: RequestPayload) =>
  entry.actions.request(payload);
