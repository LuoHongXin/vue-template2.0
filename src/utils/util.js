/**
 * 将多层嵌套数组（array）拆分成一个数组
 * @param {Array} arr
 * @returns {Array}
 */
export const flatten = arr =>
  [].concat(...arr.map(item => (Array.isArray(item) ? flatten(item) : item)));
