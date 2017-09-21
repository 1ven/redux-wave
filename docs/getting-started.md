# Getting started
First thing, you need to do, is to define the spec of your API calls.
<br/>You could use any level of nesting in the spec object.
```javascript
import { createApi } from 'redux-api-layer';

const api = createApi({
  read: {
    url: '/repos/:owner/:repo',
    method: 'GET'
  },
  edit: {
    url: '/repos/:owner/:repo',
    method: 'PATCH'
  }
}, {
  endpoint: 'https://api.github.com'
});

export default api;
```
After, api instance is ready, we need to create reducer and middleware using it.
```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createApiMiddleware, createApiReducer } from 'redux-api-layer';
import api from './api';

const store = createStore(
  combineReducers({
    api: createApiReducer(api)
  }),
  applyMiddleware(
    createApiMiddleware(api)
  )
);

export default store;
```
Next step is to dispatch request actions, to initiate data fetching for the specific api.
<br/>After data will be fetched, we can use `select` helper, to get neccessary data from the state.
```javascript
import store from './store';
import api from './api';

store.dispatch(api.read.actions.request({
  params: {
    owner: '1ven',
    repo: 'redux-api-layer'
  }
}));

store.subscribe(() => {
  const state = store.getState();

  console.log('repo data', api.read.select('data')(state));
  console.log('is data fetching?', api.read.select('isFetching')(state));
});
```

Full example is available at [Codesandbox]()