// Bucket sort, or bin sort, is a sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm.

// Steps:

// Set up an array of initially empty "buckets".
// Scatter: Go over the original array, putting each object in its bucket.
// Sort each non-empty bucket.
// Gather: Visit the buckets in order and put all elements back into the original array.
// Bucket sort assumes that the input is drawn from a uniform distribution and has an average-case running time of O(n). The computational complexity estimates involve the number of buckets.

// Worst case performance: O(n^2)

// Best case performance: Omega(n+k)

// Average case performance: Theta(n+k)

// Worst case space complexity: O(n.k)




// Copyright 2011, Tom Switzer
// Under terms of ISC License: http://www.isc.org/software/license

/**
 * Sorts an array of integers using bucket sort. This gives a good
 * speed up vs. built-in sort in new JS engines (eg. V8). If a key
 * function is given, then the result of key(a[i]) is used as the
 * integer value to sort on instead.
 *
 * @param a A JavaScript array.
 * @param key A function that maps values of a to integers.
 * @return The array a.
 */


// Combien de pots?
// Interval de pots?
// 0 , 500 , 1000 ?
// Autant de bucket que de nombres?
// Si série on des motons
'use strict';
var InsertionSort = require('./insertion.sort');
exports.seuil = 0;


/**
 * Sorts an array using bucket sort.
 * @param {number[]} array The array to sort.
 * @param {number} [bucketSize=5] The number of values a bucket can hold.
 * @returns The sorted array.
 */
exports.sort = function(array, bucketSize) {
  if (array.length === 0) {
    return array;
  }

  // Determine minimum and maximum values
  var i;
  var minValue = array[0];
  var maxValue = array[0];
  for (i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  // Initialise buckets
  var DEFAULT_BUCKET_SIZE = 10;
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var buckets = new Array(bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }
  // Distribute input array values into buckets
  for (i = 0; i < array.length; i++) {
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
  }

  // Sort buckets and place back into input array
  array.length = 0;
  for (i = 0; i < buckets.length; i++) {

    if(buckets[i].length < exports.seuil || buckets.length === 1) {
      InsertionSort.sort(buckets[i]);
    } else if(buckets.length !== 1) {
      exports.sort(buckets[i]);
    }

    for (var j = 0; j < buckets[i].length; j++) {
      array.push(buckets[i][j]);
    }
  }

  return array;
}





// exports.sort = function (array) {
//   /**
//    * Insertionsort.
//    *
//    * @private
//    * @param {array} array Input array
//    * @returns {array} array Sorted input array
//    */
//   function insertionSort(array) {
//     var current;
//     var j;
//     for (var i = 1; i < array.length; i += 1) {
//       current = array[i];
//       j = i - 1;
//       while (j >= 0 && current < array[j]) {
//         array[j + 1] = array[j];
//         j -= 1;
//       }
//       array[j + 1] = current;
//     }
//     return array;
//   }
//   /**
//    * Creates buckets for given array
//    *
//    * @private
//    * @param {array} array Input array
//    * @returns {array} buckets Array whith array for each bucket.
//    *                          Each bucket contains an array with all elements
//    *                          from the input which are with suitable size.
//    */
//   function createBuckets(array) {
//     var buckets = [];
//     var currentBucket;
//     var current;
//     for (var i = 0; i < array.length; i += 1) {
//       current = array[i];
//       currentBucket = Math.floor(current);
//       buckets[currentBucket] = buckets[currentBucket] || [];
//       buckets[currentBucket].push(current);
//     }
//     return buckets;
//   }
//   /**
//    * Sorts the arrays from each bucket.
//    *
//    * @private
//    * @param {array} buckets Given buckets
//    * @returns {array} buckets Buckets with sorted arrays for each bucket
//    */
//   function sortBuckets(buckets) {
//     console.log("The buckets to sort length:", buckets.length)
//     for (var i = 0; i < buckets.length; i += 1) {
//       if (buckets[i] !== undefined) {
//         console.log(buckets[i])
//         if(buckets[i].length === 1) {
//           console.log("Skip:");
//         } else {
//           unionBuckets(sortBuckets(createBuckets(buckets[i])));
//           // insertionSort(buckets[i]);
//         }

//         // if(buckets[i].length <= exports.seuil || buckets[i].length === 1) {
//         //   console.log("insertion");

//         // } else {
//         //   console.log("recursively with:", buckets[i]);
//         //   exports.sort(buckets[i])
//         //   // var tmpBuckets = createBuckets(buckets[i]);
//         //   // sortBuckets(tmpBuckets);
//         //   // return unionBuckets(tmpBuckets)
//         // }
//       }
//     }
//     return buckets;
//   }
//   /**
//    * Unions all buckets' arrays
//    *
//    * @private
//    * @param {array} buckets Input buckets
//    * @returns {array} result Sorted array which contains
//    *                         all elements form each bucket
//    */
//   function unionBuckets(buckets) {
//     var result = [];
//     var currentBucket;
//     for (var i = 0; i < buckets.length; i += 1) {
//       currentBucket = buckets[i];
//       if (currentBucket !== undefined) {
//         result = result.concat(currentBucket);
//       }
//     }
//     return result;
//   }
//   /**
//    * Sorts given array with bucketsort.<br><br>
//    * Time complexity: O(N) in case the
//    * data is with uniform distribution.
//    *
//    * @example
//    *
//    * var sort = require('path-to-algorithms/src/'+
//    * 'sorting/bucketsort').bucketSort;
//    * console.log(sort([2, 5, 1, 0, 4])); // [ 0, 1, 2, 4, 5 ]
//    *
//    * @public
//    * @module sorting/bucketsort
//    * @param {Array} array Input array which should be sorted.
//    * @return {Array} Sorted array.
//    */
//   function getArrayOfNumbers(array) {
//     return array.map(function(element) {
//       return parseInt(element);
//     });
//   }



//   exports.seuil = (exports.seuil) ? exports.seuil : 0;
//   var buckets = createBuckets(getArrayOfNumbers(array));
//   sortBuckets(buckets);
//   // console.log("Sorted:", buckets)
//   // console.log("Union:", unionBuckets(buckets));
//   return unionBuckets(buckets);
// };
