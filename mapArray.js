/* MAP
Iterar todos los elementos de un array
 */

var oldArray = [1,2,3,4,5];


var newArray = oldArray.map(function (val) {
    return val + 3;
});


/*
#################################################################################################################################################################
 */



/*   REDUCE
The array method reduce is used to iterate through an array and condense it into one value.

To use reduce you pass in a callback whose arguments are an accumulator (in this case, previousVal) and the current value (currentVal).
 */

var array = [4,5,6,7,8];
var singleVal = 0;

singleVal = array.reduce(function(previousVal, currentVal) {
    console.log(previousVal + currentVal);
    return previousVal + currentVal;
}, 0);


/*
#################################################################################################################################################################
 */


/* FILTER
The filter method is used to iterate through an array and filter out elements where a given condition is not true.

filter is passed a callback function which takes the current value (we've called that val) as an argument.

Los elementos del Array que devuelvan True se mantendran y los que devuelvan false se Eliminaran
 */

// Eliminar Elementos Iguales a 5

array = array.filter(function(val) {
    return val !== 5;
});


/*
#################################################################################################################################################################
 */


/* SORT
You can use the method sort to easily sort the values in an array alphabetically or numerically.

Unlike the previous array methods we have been looking at, sort actually alters the array in place. However, it also returns this sorted array.

sort can be passed a compare function as a callback. The compare function should return a negative number if a should be before b,
a positive number if a should be after b, or 0 if they are equal.
 */

var array = [1, 12, 21, 2];

// Ordenar de Mayor a Menor
array.sort(function(val1, val2) {
    return val2 - val1;
});

// Ordenar de Menor a Mayor
array.sort(function(a, b) {
    return a - b;
});


/*
#################################################################################################################################################################
 */


/* REVERSE
You can use the reverse method to reverse the elements of an array.

reverse is another array method that alters the array in place, but it also returns the reversed array.
 */

var myArray = [1, 2, 3];
myArray.reverse();



/*
#################################################################################################################################################################
 */

/* CONCAT
Concatenate Arrays with concat

concat can be used to merge the contents of two arrays into one.

concat takes an array as an argument and returns a new array with the elements of this array concatenated onto the end.
 */


var oldArray = [1,2,3];
var newArray = [];

var concatMe = [4,5,6];


newArray = oldArray.concat(concatMe);



/*
#################################################################################################################################################################
 */

/* SPLIT - Split Strings with split
You can use the split method to split a string into an array.

split uses the argument you pass in as a delimiter to determine which points the string should be split at.
 */

var string = "Split me into an array";
var array = [];


array = string.split(' ');



/*
#################################################################################################################################################################
 */


/*  JOIN - Join Strings with join

We can use the join method to join each element of an array into a string separated by whatever delimiter you provide as an argument.
 */


var joinMe = ["Split","me","into","an","array"];
var joinedString = '';


joinedString = joinMe.join(' ');