export type Constants = {
  request: string;
  success: string;
  failure: string;
};

/**
 * 
 * @param context Entry context, relative to global store.
 */
export default (context: string): Constants => ({
  request: `${context}/request`,
  success: `${context}/success`,
  failure: `${context}/failure`
});
