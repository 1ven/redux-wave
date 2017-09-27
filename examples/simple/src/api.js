import { createApi } from 'redux-wave';

const api = createApi({
  readRepos: {
    path: '/users/:username/repos',
    method: 'GET'
  },
}, {
  endpoint: 'https://api.github.com'
});

export default api;