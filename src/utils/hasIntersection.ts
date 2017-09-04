import { curry, whereEq } from "ramda";

/**
 * Checks whether object "b" contains object "a" inside
 */
export default curry((a, b) => (!b ? false : whereEq(a, b)));
