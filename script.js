/**
 * Jurk Calculator v1.0
 */
// Global Variables
input_storage = [''];
input_index = 0;

$(function () {    //docready
    $('button.number_button').on('click', function () {
        console.log('I clicked on a number', $(this).text());
        number_input($(this).text());
    });
    $('button.operation').on('click', function () {
        console.log('I clicked on an operator', $(this).text());
        operator_input($(this).text());
    });
    $('button.equals').on('click', function () {
        console.log('equals was clicked');
        process_input_storage();
    });
    $('button.CE').on('click', function () {
        console.log('you have CLEARED EVERYTHING!');
        clearEverything();
    });
    $('button.clearbutton').on('click', function () {
        console.log('you have cleared one entry!');
        clear();
    });
});

/*
 @purpose: clears all everything from the display
 @params: none
 number:
 returns:refreshDisplay();
 globals:
 input_storage: the array that will hold our numbers and operators
 input_index: bookmark for the input_storage array, so we know where we are inserting
 */
function clearEverything() {
    input_storage = [''];
    input_index = 0;
    refreshDisplay();
}


/*
 @purpose: clears one entry from the display screen on calculator
 @params:
 number:
 @returns: clearEverything(); refreshDisplay();
 globals:
 input_storage: the array that will hold our numbers and operators
 input_index: bookmark for the input_storage array, so we know where we are inserting
 */
function clear() {
    if (input_storage.length <= 1) {
        clearEverything();

    } else {
        input_storage.pop();
        refreshDisplay();
    }
}


    /*
     @purpose: take the number from the button and insert it into the input_storage
     @params:
     number: the numeric string from the button
     @returns:
     none
     @globals:
     input_storage: the array that will hold our numbers and operators
     input_index: bookmark for the input_storage array, so we know where we are inserting
     */
    function number_input(number) {
        console.log('number_input function called ' + number);
        input_storage[input_index] = input_storage[input_index] + number;
        console.log(input_storage);
        refreshDisplay();
    }


    /*
     @purpose: take the operator from the button and insert it into the input_storage
     @params:
     operator: the operator string from the button
     @returns:
     none
     @globals:
     input_storage: the array that will hold our numbers and operators
     input_index: bookmark for the input_storage array, so we know where we are inserting
     */
    function operator_input(operator) {
        console.log('operator_input function called' + operator);
        input_storage[++input_index] = operator;
        input_index++;
        input_storage[input_index] = '';
        console.log(input_storage);
        refreshDisplay();
    }


    /*
     @purpose: display numbers and calculations on display box on calculator by iterating through the input_storage array
     @params:
     none
     @returns:
     none
     @globals:
     none
     */

    function refreshDisplay() {
        for (var i = 0; i < input_storage.length; i++) {
            $('#display').text(input_storage[i]);

        }
    }

    /*
     @purpose: iterate through the input_storage array and find 2 numbers and an operator to do math, then call jurk_math
     @params:
     none
     @returns:
     none
     @globals:
     input_storage: the array that will hold our numbers and operators
     input_index: bookmark for the input_storage array, so we know where we are inserting
     */
    var result;

    function process_input_storage() {
        var num1 = null;
        var num2 = null;
        var operator = null;//make variables num1, num2, and operator, set them all equal to null
        var result;
        for (var i = 0; i < input_storage.length; i++) {//iterate through the input storage array

            if (!isNaN(input_storage[i]) && num1 == null) {
                console.log('first' + !isNaN(input_storage[i]));//
                num1 = input_storage[i];

            } else if (!isNaN(input_storage[i]) && num2 == null) {
                console.log('second' + !isNaN(input_storage[i]));
                num2 = input_storage[i];
                result = jurkMath(num1, num2, operator);
                input_storage[i] = result;
                input_storage.splice(0, 2);
                i = -1;
                num1 = null;
                num2 = null;
                operator = null;
            } else {
                (isNaN(input_storage[i])); //if the index value in input_storage is an operator
                console.log('third' + parseInt(input_storage[i]));
                operator = input_storage[i];//store the operator into operator
            }
        }
        refreshDisplay();

    }

    /*
     @purpose: based on the operator, choose which form of math to do, then return the result
     @params:
     num1: the first number
     num2: the second number
     operator: the mathematical operator
     @returns:
     a number that is the result of the mathematical operation
     @globals:
     none
     */
    function jurkMath(num1, num2, operator) { //declared function jurk_math
        var result;
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (operator)  //made switch statement to choose which form of math to compute
        {
            case '+':                   // make case for division
                result = num1 + num2;     // num1 / num2 for case of division
                break;
            case '-':                   //make case for multiplication
                result = num1 - num2;     // num1 * num2 for case of multiplication
                break;
            case 'x':                   //make a case for subtraction "-"
                result = num1 * num2;     // num1 - num2 for case of subtraction
                break;
            case '/':                   //make case for addition '+'
                result = num1 / num2;     // num1 + num2 for case of addition
        }
        console.log('this is the result:', result);
        return result;

    }

