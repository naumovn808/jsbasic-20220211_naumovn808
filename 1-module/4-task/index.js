function checkSpam(str) {
  let strToLower = str.toLowerCase();
  if (strToLower.includes('1xBet') ||
    strToLower.includes('xxx')) {
    return true;
  } else {
    return false;
  }
}
