import { Constants } from "../createConstants";

export type State<T> = {
  isFetching: boolean;
  lastUpdated?: number;
  error?: string;
  data?: T;
};

const initialState = {
  isFetching: false
};

/**
 * Creates reducer, which handles async actions for specific entry
 * 
 * @param constants Async constants
 */
export default <T>({ request, success, failure }: Constants) => (
  state: State<T> = initialState,
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
