/**
 * Merges list of reducers into one reducer.
 * All input reducers should handle the same state.
 * 
 * @param reducers reducers list to merge
 */
export default (...reducers) => (state, action) =>
  reducers.reduce((prevState, r) => r(prevState, action), state);
