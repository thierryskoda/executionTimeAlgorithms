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
exports.sort = function(a, key) {
    key = key || function(x) { return x };
    var len = a.length,
        buckets = [],
        i, j, b, d = 0;
    for (; d < 32; d += 4) {
        for (i = 16; i--;)
            buckets[i] = [];
        for (i = len; i--;)
            buckets[(key(a[i]) >> d) & 15].push(a[i]);
        for (b = 0; b < 16; b++)
            for (j = buckets[b].length; j--;)
                a[++i] = buckets[b][j];
    }
    return a;
}
