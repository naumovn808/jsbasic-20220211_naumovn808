function filterRange(arr, a, b) {
  let i = 0;
  let result = [];
  for (i = 0; i < arr.length; i++) {
    if (arr[i] >= a && arr[i] <= b) {
      result.push(arr[i]);
    }
  }
  return result;
}
