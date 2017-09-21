# Conception
The library provides declarative way to define your api calls, dispatch actions and access needed data from the store.

Under the hood, for every defined api call, library creates request, success and failure constants, actions, selectors to access derived data from state, fetch function for making http requests to api and reducer which handles corresponding actions.

Everytime, when you are dispatching request actions, middleware is listening to them and making requests to api. After request comes back, either success or failure action is dispatched.

Next, when you need derived data in your components, you use select helper to get that data from state.

In some specific cases you will need to store data of the same api call, but with different request data or extend the library using enhancers.
<br/>See [Advanced usage]() for details.