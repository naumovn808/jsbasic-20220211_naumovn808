function filterRange(arr, a, b) {
  const i = 0;
  const result = [];
  for (i = 0; i < arr.length; i++) {
    if (arr[i] >= a && arr[i] <= b) {
      result.push(arr[i]);
    }
  }
  return result;
}
