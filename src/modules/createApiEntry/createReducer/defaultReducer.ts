import { Constants } from "../createConstants";
import { RequestPayload } from "../createActions";
import { handlers } from "./";

export type State = {
  isFetching: boolean;
  request?: RequestPayload;
  lastUpdated?: number;
  error?: string;
  data?: any;
};

const initialState = {
  isFetching: false
};

export type Reducer = (state: State, action) => State;

/**
 * Creates reducer, which handles async actions for specific entry
 * 
 * @param constants Async constants
 */
export default ({ request, success, failure }: Constants): Reducer => (
  state: State = initialState,
  action
) => {
  switch (action.type) {
    case request:
      return {
        ...state,
        ...handlers.request(action.payload)
      };
    case success:
      return {
        ...state,
        ...handlers.success(action.payload)
      };
    case failure:
      return {
        ...state,
        ...handlers.failure(action.payload)
      };
    default:
      return state;
  }
};
