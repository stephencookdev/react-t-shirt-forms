export const findFirstOverlap = (obj, keys) => {
  const objKeys = Object.keys(obj);
  return objKeys.find(k => keys.includes(k));
};

export const pickBy = (obj, func) =>
  Object.keys(obj).reduce((acc, key) => {
    if (!func(key, obj[key])) return acc;

    return {
      ...acc,
      [key]: obj[key]
    };
  }, {});
export const pick = (obj, keys) => pickBy(obj, k => keys.includes(k));
export const omitBy = (obj, func) => pickBy(obj, (...args) => !func(...args));
export const omit = (obj, keys) => omitBy(obj, k => keys.includes(k));
