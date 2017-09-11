import * as isMatch from "lodash.ismatch";
import { curry } from "ramda";

/**
 * Checks whether object "b" contains object "a" inside
 */
export default curry((a, b) => (!b ? false : isMatch(b, a)));
