function compareNumbers(a, b) {
  return a - b;
}

function compareStrings(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  // names must be equal
  return 0;
}

export function listSort(original, field) {
  return [...original].sort((a, b) => {
    if (field === 'position') {
      return compareNumbers(a[field], b[field]);
    } else if (field === 'name') {
      return compareStrings(a[field], b[field]);
    } else {
      return 0;
    }
  });
}
