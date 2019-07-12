import React from "react";

export const renderFuncOrString = X => (typeof X === "function" ? <X /> : X);

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

export const isObject = item =>
  item && typeof item === "object" && item.constructor === Object;

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

export const deepEquals = (x, y) => {
  if (Array.isArray(x)) {
    if (!Array.isArray(y)) return false;
    if (x.length !== y.length) return false;

    const foundYIndices = [];
    for (let i = 0; i < x.length; i++) {
      const foundIndex = y.findIndex(
        (yAtJ, j) => !foundYIndices.includes(j) && deepEquals(x[i], yAtJ)
      );
      if (foundIndex === -1) return false;
      foundYIndices.push(foundIndex);
    }

    return true;
  } else if (typeof x === "object") {
    if (typeof y !== "object") return false;

    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);
    if (!deepEquals(xKeys, yKeys)) return false;

    for (let i = 0; i < xKeys.length; i++) {
      const k = xKeys[i];
      if (!deepEquals(x[k], y[k])) return false;
    }

    return true;
  } else {
    return x === y;
  }
};
