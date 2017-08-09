import { Constants } from "./createConstants";

export type State = {
  isFetching: boolean;
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
        isFetching: true
      };
    case success:
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.payload.meta.receivedAt,
        error: void 0,
        data: action.payload.body
      };
    case failure:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      };
    default:
      return state;
  }
};
