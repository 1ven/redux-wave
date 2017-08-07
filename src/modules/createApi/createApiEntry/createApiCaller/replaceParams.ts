/**
 * Replaces params according to given params object.
 *
 * @param template Template with params names.
 * @param params Params object.
 * @return Returns string with replaced params.
 */
export default (template: string, params: Params): string => {
  return template.replace(/:[a-z|A-Z]+/g, match => {
    const matchedParam = match.substr(1);
    const value = params[matchedParam];

    if (typeof value === "undefined") {
      throw new Error(
        `Matched param "${matchedParam}" is not presented at given object`
      );
    }

    return value.toString();
  });
};

export type Params = {
  [key: string]: string | number;
};
