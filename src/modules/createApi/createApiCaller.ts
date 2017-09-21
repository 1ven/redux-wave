import { RequestAction } from "./createActions";
import { replaceParams } from "../../utils";

export type ResponseMeta = {
  status: number;
  receivedAt: number;
};

export type Caller = (
  onSuccess: (body: any, meta: ResponseMeta) => void,
  onFailure: (msg: string, body?: any, meta?: ResponseMeta) => void,
  payload?: RequestAction["payload"]
) => void;

/**
 * Creates api caller, which makes request for the entry
 * 
 * @param onSuccess Success callback
 * @param onFailure Failure callback
 * @param payload Request action payload data
 */
export default (url: string, method: string): Caller => (
  onSuccess,
  onFailure,
  payload?
) => {
  let xhr = new XMLHttpRequest();

  const requestParams = payload && payload.params;
  const requestBody = payload && payload.body;

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
      const body = parseBody(xhr);

      if (isSuccessResponse(meta.status)) {
        onSuccess(body, meta);
      } else {
        onFailure((body && body.message) || "Something went wrong", body, meta);
      }
    }
  };

  xhr.open(method.toUpperCase(), replaceParams(url, requestParams));
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(requestBody));
};

const parseBody = xhr =>
  xhr.responseText ? JSON.parse(xhr.responseText) : void 0;

const isSuccessResponse = (status: number) => status >= 200 && status < 300;
