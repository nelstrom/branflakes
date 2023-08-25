function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function listSort(original, field) {
  return [...original].sort((a, b) => {
    return compare(a[field], b[field]);
  });
}
