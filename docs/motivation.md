# Motivation
## Why
API calls handling in redux applications, easily can become a nightmare, when your app is having a lot of them.

For every api call, we need to create `request`, `success` and `failure` constants with corresponding actions. All of them needs to be handled in corresponding api reducer. Finally for every api call, we need to listen for `request` action, initiate api fetching and dispatch either `success` or `failure` actions back somewhere like `sagas` or `epics`.

Let's look at the code:
```
import { call, put, select, cancel, takeLatest } from 'redux-saga/effects';

const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST';
const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';

const requestRepos = (owner, repo) => ({
  type: FETCH_REPOS_REQUEST,
  payload: {
    owner,
    repo
  }
});

const successRepos = (body) => ({
  type: FETCH_REPOS_SUCCESS,
  payload: {
    body
  }
});

const failureRepos = (message) => ({
  type: FETCH_REPOS_FAILURE,
  payload: {
    message
  }
});

const reposReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPOS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.body,
        error: undefined
      }
    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.message
      }
    default: return state;
  }
}

const fetchRepos = function*(action) {
  const { owner, repo } = action.payload;
  const url = `https://api.github.com/repos/${owner}/${repo}`;

  try {
    // `request` here, is a generic function for fetching apis.
    const repos = yield call(request, url);
    yield put(successRepos(repos));
  } catch (err) {
    yield put(failureRepos(err.message));
  }
}

const reposSaga = function*() {
  yield takeLatest(FETCH_REPOS_REQUEST, fetchRepos);
}
```

All these steps above needs to be repeated everytime you defining new api call in your application. This is not scalable approach as it leads to a huge code duplication, when your app is doing a lot of api calls.
## Solution
Instead of doing a lot of repetitive actions, the library provides declarative way to define your api calls:
```
const api = createApi({
  fetchRepos: {
    url: '/repos/:repo/:owner',
    method: 'GET'
  }
}, {
  endpoint: 'https://api.github.com'
});
```
That's it. You are just defining your api calls in a declarative way, the rest will be handled by the library under the hood. Next, you can dispatch needed action, select that data from the store and more.

For further information, see [Getting started]()