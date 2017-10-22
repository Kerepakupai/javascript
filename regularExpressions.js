/*
For example, if we wanted to find the word the in the string The dog chased the cat, we could use the following regular expression: /the/gi

Let's break this down a bit:

/ is the start of the regular expression.

the is the pattern we want to match.

/ is the end of the regular expression.

g means global, which causes the pattern to return all matches in the string, not just the first one.

i means that we want to ignore the case (uppercase or lowercase) when searching for the pattern.
 */

// Setup
var testString = "Ada Lovelace and Charles Babbage designed the first computer and the software that would have run on it.";

// Example
var expressionToGetSoftware = /software/gi;
var softwareCount = testString.match(expressionToGetSoftware).length;

/*
#################################################################################################################################################################
 */

// Find Numbers with Regular Expressions

/*
One such selector is the digit selector \d which is used to retrieve one digit (e.g. numbers 0 to 9) in a string.

In JavaScript, it is used like this: /\d/g.

Appending a plus sign (+) after the selector, e.g. /\d+/g, allows this regular expression to match one or more digits.

The trailing g is short for 'global', which allows this regular expression to find all matches rather than stop at the first match.
 */

// Setup
var testString = "There are 3 cats but 4 dogs.";

// Only change code below this line.

var expression = /\d+/g;  // Change this line

// Only change code above this line

// This code counts the matches of expression in testString
var digitCount = testString.match(expression).length;

/*
#################################################################################################################################################################
 */


// Find Whitespace with Regular Expressions
/*
We can also use regular expression selectors like \s to find whitespace in a string.

The whitespace characters are " " (space), \r (the carriage return), \n (newline), \t (tab), and \f (the form feed).

The whitespace regular expression looks like this:

/\s+/g
 */


// Setup
var testString = "How many spaces are there in this sentence?";

// Only change code below this line.

var expression = /\s+/g;  // Change this line

// Only change code above this line

// This code counts the matches of expression in testString
var spaceCount = testString.match(expression).length;


/*
#################################################################################################################################################################
 */

//Invert Regular Expression Matches with JavaScript
/*
You can invert any match by using the uppercase version of the regular expression selector.

For example, \s will match any whitespace, and \S will match anything that isn't whitespace.
 */


// Setup
var testString = "How many non-space characters are there in this sentence?";

// Only change code below this line.

var expression = /\S/g;  // Contar Numero de Letras
var expression = /\S+/g;  // Contar Numero de Palabras


// Only change code above this line

// This code counts the matches of expression in testString
var nonSpaceCount = testString.match(expression).length;
