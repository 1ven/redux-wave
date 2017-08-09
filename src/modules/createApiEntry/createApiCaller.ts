import { RequestPayload } from "./createActions";
import { SpecEntry } from "./";
import { resolvePath, replaceParams } from "../../utils";

export type Meta = {
  status: number;
  receivedAt: number;
};

export type Caller = (
  onSuccess: (body: any, meta: Meta) => void,
  onFailure: (msg: string, body?: any, meta?: Meta) => void,
  payload?: RequestPayload
) => void;

/**
 * Creates api caller, which makes request for the entry
 * 
 * @param onSuccess Success callback
 * @param onFailure Failure callback
 * @param payload Request action payload data
 */
export default (entry: SpecEntry): Caller => (
  onSuccess,
  onFailure,
  payload?
) => {
  let xhr = new XMLHttpRequest();

  const url = resolvePath(
    entry.config.endpoint,
    replaceParams(entry.url, payload && payload.params)
  );

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 0) {
        onFailure("Network failure");
        return;
      }

      const meta = {
        status: xhr.status,
        receivedAt: Date.now()
      };
      const body = JSON.parse(xhr.responseText);

      if (isSuccessResponse(meta.status)) {
        onSuccess(body, meta);
      } else {
        onFailure((body && body.message) || "Something went wrong", body, meta);
      }
    }
  };

  xhr.open(entry.method.toUpperCase(), url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(JSON.stringify(payload && payload.body));
};

const isSuccessResponse = (status: number) => status >= 200 && status < 300;
