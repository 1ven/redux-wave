export default reducer => apiEntry => ({
  ...apiEntry,
  reducer: (state, action) => reducer(apiEntry.reducer(state, action), action)
});