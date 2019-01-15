function fill(arr, value, start, end) {
  for (var i = start; i < end; i++) {
    arr[i] = value;
  }
}
var array = [2, 4, 5, 6];
fill(array, 5);
console.log(array);
