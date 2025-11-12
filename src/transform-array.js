const { NotImplementedError } = require('../lib');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");
  const transformArr = [];
  const comands = {
    '--double-next': (i) => transformArr.push(arr[i + 1]),
    '--double-prev': (i) => {
      if (!prevDiscarded) transformArr.push(arr[i - 1]);
    },
    '--discard-next': (i) => { skipnext = true; prevDiscarded = true },
    '--discard-prev': (i) => { if (!prevDiscarded) transformArr.pop(); }
  };
  let skipnext = false;
  let prevDiscarded = false;
  for (let i = 0; i < arr.length; i += 1) {
    if (skipnext) {
      skipnext = false;
      prevDiscarded = false;
      continue;
    }
    if ((arr[i] === '--discard-prev' || arr[i] === '--double-prev') && i === 0) continue;
    if ((arr[i] === '--double-next' || arr[i] === '--discard-next') && i === arr.length - 1) continue;
    if (comands[arr[i]]) {
      comands[arr[i]](i);
    } else transformArr.push(arr[i]);
  }
  return transformArr;
}

module.exports = {
  transform
};
