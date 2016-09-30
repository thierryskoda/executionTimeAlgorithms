var MergeSort = require('./algo/merge.sort');
var InsertionSort = require('./algo/insertion.sort');
var BucketSort = require('./algo/bucket.sort');
var fs = require('fs');
var json2csv = require('json2csv');


/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
 /  Constants
 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
const NUMBER_OF_EXAMPLAIRE = 30;
const fields = ['taille', 's1', 's2', 's3'];
const MAX_SEUIL = 100;
const arrayType = (process.argv.length > 2) ? process.argv[2] : 'merge';
const seuil = (process.argv.length > 3) ? process.argv[3] : 0;
const TAILLE = (process.argv.length > 4) ? [process.argv[4]] : [1000, 5000, 10000, 50000, 100000];


/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
 /  UTility functions
 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
function getArrayOfNumbers(array) {
  return array.map(function(element) {
    return parseInt(element);
  });
}

// Exports to CSV
function exportToCsv(fileName, data, fields) {
  var result = json2csv({
    data: data,
    fields: fields
  });

  fs.writeFile('results/' + fileName, result, function(err) {
    if (err) throw err;
    console.log(fileName + " file created");
  });
}

// Get the execution time of the array
function getExecutionTime(arrayToSort, type, seuil) {
  // Put it in numbers
  arrayToSort = getArrayOfNumbers(arrayToSort);

  if(type === 'merge') {
    MergeSort.seuil = seuil;
    var hrstart = process.hrtime();
    var sortedArray = MergeSort.sortV3(arrayToSort);
    var hrendMilli = process.hrtime(hrstart)[1]/1000000;
  } else {
    var hrstart = process.hrtime();
    var sortedArray = BucketSort.sort(arrayToSort);
    var hrendMilli = process.hrtime(hrstart)[1]/1000000;
  }
  return hrendMilli;
}


/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
 /  The program
 /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
for (var j = 0; j < TAILLE.length; j++) {
  var totalTempsExamplaire = 0;
  var s1 = 0;
  var s2 = 0;
  var s3 = 0;

  // Loop sur nombre d'examplaire
  for (var i = 0; i < NUMBER_OF_EXAMPLAIRE; i++) {
    // Get the array from the file
    var array = fs.readFileSync("./donnees/testset_" + TAILLE[j] + "_" + i + ".txt").toString().split("\n");

    totalTempsExamplaire += getExecutionTime(array, arrayType, seuil);

    // Calcule de la totalTempsExamplaire pour la série
    switch(i) {
      case 9:
        s1 = totalTempsExamplaire / 10;
        console.log("Moyenne pour taille " + TAILLE[j] + " avec seuil de " + seuil + " pour la série 1 est: " + s1 + "ms")
        totalTempsExamplaire = 0;
        break;
      case 19:
        s2 = totalTempsExamplaire / 10;
        console.log("Moyenne pour taille " + TAILLE[j] + " avec seuil de " + seuil + " pour la série 2 est: " + s2 + "ms")
        totalTempsExamplaire = 0;
        break;
      case 29:
        s3 = totalTempsExamplaire / 10;
        console.log("Moyenne pour taille " + TAILLE[j] + " avec seuil de " + seuil + " pour la série 3 est: " + s3 + "ms")
        totalTempsExamplaire = 0;
        var data = [{
          taille: TAILLE[j],
          s1: s1,
          s2: s2,
          s3: s3
        }];
        exportToCsv("CSV_" + arrayType + "_taille_" + TAILLE[j] + "_seuil_" + seuil + ".csv", data, fields);

        s1=0;
        s2=0;
        s3=0;
        break;
    }
  }
}
