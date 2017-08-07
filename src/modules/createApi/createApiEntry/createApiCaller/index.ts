import { RequestPayload } from "../createActions";
import { SpecEntry } from "../../";
import replaceParams from "./replaceParams";
import resolveUrl from "./resolveUrl";

export type Meta = {
  status: number;
  receivedAt: number;
};

/**
 * Creates api caller, which makes request for the entry
 */
export default (entry: SpecEntry) => <T>(
  payload: RequestPayload,
  onSuccess: (body: T, meta: Meta) => void,
  onFailure: (msg: string, body?: any, meta?: Meta) => void
) => {
  let xhr = new XMLHttpRequest();

  const url = resolveUrl(
    entry.config.endpoint,
    replaceParams(entry.url, payload.params)
  );

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
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

  xhr.onerror = function() {
    onFailure("Network failure");
  };

  xhr.open(entry.method.toUpperCase(), url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(JSON.stringify(payload.body));
};

const isSuccessResponse = (status: number) => status >= 200 && status < 300;
