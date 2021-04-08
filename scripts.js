/*----- Variables -----*/
let number1 = "", number2 = "", operator = "";

/*---- Selecting elements ----*/
var arrNumbers = document.querySelectorAll(".number");
// console.log(arrNumbers);
var arrOperators = document.querySelectorAll(".operator");
// console.log(arrOperators);
var objPreview = document.querySelector(".preview");
// console.log(objPreview);
var objMaths = document.querySelector(".maths");
// console.log(objMaths);
var objClear = document.querySelector(".clear");
// console.log(objClear);
var objEquals = document.querySelector(".equals");
// console.log(objEquals);


/*----- Event Listeners -----*/
for(counter = 0; counter < arrNumbers.length; counter++){
    // console.log(arrNumbers[counter]);
    objNumber = arrNumbers[counter];
    objNumber.addEventListener("click", preview);
}
for(counter = 0; counter < arrOperators.length; counter++){
    // console.log(arrNumbers[counter]);
    objOperator = arrOperators[counter];
    objOperator.addEventListener("click", preview);
}
objClear.addEventListener("click", clear);
objEquals.addEventListener("click", equals);

/*----- Functions -----*/
function preview(event){
    // console.log(event.target.innerHTML);
    var currentItem = event.target.innerHTML;
    var dataType;
    var strMessage;
    switch(currentItem){
        case '*':
        case '/':
        case '-':
        case '+':
            dataType = 'operator';
        break;
        default:
            dataType = 'number'
        break;
    }
    // console.log(currentItem);
    console.log(dataType);
    if(dataType == 'operator'){
        if(number1){
            operator = currentItem;
            strMessage = number1 + ' ' + operator;
        } else {
            console.log('You cannot set an operator without a number being set');
        }
    } else {
        if(operator){
            if(number2){
                number2 += currentItem;
            } else {
                number2 = currentItem;
            }
            strMessage = number1 + ' ' + operator + ' ' + number2;
        } else {
            if(number1){
                number1 += currentItem;
            } else {
                number1 = currentItem;
            }
            strMessage = number1;
        }
    }
    objPreview.value = strMessage;
}

function clear(event){
    number1 = "";
    number2 = "";
    operator = "";
    objPreview.value = "";
    objMaths.value = "";
}


function equals(){
    var sum = calculator(number1,number2,operator);
    objMaths.value = sum;
}

//Adding a validation function for the numbers
function isValidNumber(number){
    //We are using a double negative as inNaN returns false on valid numbers
    return !isNaN(number);
}
function calculator(number1,number2,operator){
    //if number1 is not a number
    if(!isValidNumber(number1)){
        //end the function here and pass the message below.
        return 'Argument 1 must be a number';
    }
    //if number 2 is not a number
    if(!isValidNumber(number2)){
        //end the function here and pass the message below.
        return 'Argument 2 must be a number';
    }
    // if the operator does not equal + - * / %
    if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
        //end the function here and pass the message below.
        return 'Argument 3 must be an arithmatic operator';
    }
    //all fo the validation has passed so we need to do maths
    var sum;
    //based on the operator passed in argument 3 we will do a different sum
    switch(operator){
        case '+':
            sum = parseFloat(number1) + parseFloat(number2);
        break;
        case '-':
            sum = number1 - number2;
        break;
        case '*':
            sum = number1 * number2;
        break;
        case '/':
            sum = number1 / number2;
        break;
        case '%':
            sum = number1 % number2;
        break;
    }
    //return the value of the sum
    return sum;
}