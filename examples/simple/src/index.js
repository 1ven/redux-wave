import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createApiMiddleware, createApiReducer } from "redux-wave";
import { Provider } from "react-redux";
import api from "./api";
import Repos from "./Repos";

const store = createStore(
  combineReducers({
    api: createApiReducer(api)
  }),
  applyMiddleware(createApiMiddleware(api))
);

render(
  <Provider store={store}>
    <Repos />
  </Provider>,
  document.getElementById("root")
);
