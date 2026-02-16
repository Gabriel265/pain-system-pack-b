// src/app/utils/lodashExample.js

import _ from 'lodash';

export function getUniqueValues(array) {
  return _.uniq(array);
}

// Example usage
const values = [1, 2, 2, 3, 4, 4, 5];
console.log(getUniqueValues(values)); // Output: [1, 2, 3, 4, 5]
