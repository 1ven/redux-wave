import React from "react";
import { connect } from "react-redux";
import api from "./api";

const { select, actions: { request } } = api.readRepos;

export default connect(
  state => ({
    isFetching: select("isFetching")(state),
    repos: select("data")(state),
    error: select("error")(state)
  }),
  dispatch => ({
    onSubmit(username) {
      dispatch(
        request({
          params: {
            username
          }
        })
      );
    }
  })
)(({ isFetching, repos = [], onSubmit, error }) => (
  <div>
    <div>Input GitHub user and push enter:</div>
    <input
      type="text"
      placeholder="Enter repo"
      defaultValue="1ven"
      onKeyUp={e => e.key === "Enter" && onSubmit(e.target.value)}
    />
    <div>
      {isFetching ? (
        "Loading..."
      ) : error ? (
        error
      ) : (
        repos.map(({ name }, i) => <div key={i}>{name}</div>)
      )}
    </div>
  </div>
));
