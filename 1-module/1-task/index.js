function factorial(n) {
  var result = 1;
  while (n) {
    if (n == 0 || n == 1) {
      break;
    }
    result *= n--;
  }
  return result;
}
