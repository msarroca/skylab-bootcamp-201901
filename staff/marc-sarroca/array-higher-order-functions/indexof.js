function indexOf(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
}
var array = [2, 4, 5, 6];
var res = indexOf(array, 5);
console.log(res);
