/**
 * Abstraction of fill.
 *
 * Fills an array from one position to other.
 *
 * @param {Array} array
 * @param {*} value
 * @throws {Error} - If too many arguments (> 4)
 * @throws {TypeError} - If array is not an array
 */

function indexOf(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
    if (i === arr.length - 1) {
      return -1;
    }
  }
}

var array = [2, 4, 5, 6];
var res = indexOf(array, 1);
console.log(res);
