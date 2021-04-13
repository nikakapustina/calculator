/*----- Variables -----*/
let number1 = "", number2 = "", operator = "", blnEquals=false;

/*---- Selecting elements ----*/
var arrNumbers = document.querySelectorAll(".number");
// console.log(arrNumbers);
var arrOperators = document.querySelectorAll(".operator");
// console.log(arrOperators);
var objPreview = document.querySelector(".previous-operand");
// console.log(objPreview);
var objPrevious = document.querySelector(".previous");
// console.log(objPrevious);
var objMaths = document.querySelector(".current-operand");
// console.log(objMaths);
var objClear = document.querySelector(".clear");
// console.log(objClear);
var objEquals = document.querySelector(".equals");
// console.log(objEquals);
var objError = document.querySelector(".error");
// console.log(objError);
var objDecimal = document.querySelector(".decimal");
// console.log(objDecimal);


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
objDecimal.addEventListener("click", preview);

/*----- Functions -----*/
function preview(event){
    console.log(blnEquals)
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
    // console.log(dataType);
    //if the data type equals operator
    console.log(dataType);
    if(dataType == 'operator'){
        if (blnEquals){

            blnEquals=false;
        }
        if(number2){
            number1 = calculator(number1, number2, operator);
            number2 = "";
            objMaths.innerHTML = "";
        }
        
        
        if(number1){
            operator = currentItem;
            strMessage = number1 + ' ' + operator;
        } else {
            objError.innerHTML = 'You cannot set an operator without a number being set';
            return;
        }
    } else {
        if (blnEquals){
            number1 = "";
            blnEquals=false;
        }
        if(operator){
            if(number2){
                if(currentItem == '.'){
                    if(!hasDecimal(number1)){
                        number2 += currentItem;
                    }
                } else {
                    number2 += currentItem;
                }
            } else {
                if(currentItem == '.'){
                    number2 = '0.';
                } else {
                    number2 = currentItem;
                }
            }
            strMessage = number1 + ' ' + operator + ' ' + number2;
            var sum = calculator(number1,number2,operator);
            objMaths.value = sum;
        } else {
            if(number1){
                if(currentItem == '.'){
                    if(!hasDecimal(number1)){
                        number1 += currentItem;
                    }
                } else {
                    number1 += currentItem;
                }
            } else {
                if(currentItem == '.'){
                    number1 = '0.';
                } else {
                    number1 = currentItem;
                }
            }
            strMessage = number1;
        }
    }
    objPreview.innerHTML = strMessage;
}


function clear(event){
    number1 = "";
    number2 = "";
    operator = "";
    objPreview.innerHTML = "";
    objMaths.innerHTML = "";
    objPrevious.innerHTML = "";
    objError.innerHTML = "";
}


function equals(){
    var sum = calculator(number1,number2,operator);
    if(sum){    
        objMaths.innerHTML = "";
        objPrevious.innerHTML = objPreview.innerHTML;
        objMaths.innerHTML = sum;
        blnEquals = true;
        number1 = sum;
        number2 = "";
        operator = "";
    }
}

function hasDecimal(number){
    if(number.indexOf('.') !== -1){
    objError.innerHTML = 'You can only have one decimal place per number';
    return true;
    }
    return false;
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
        objError.innerHTML = 'Argument 1 must be a number';
        return;
    }
       // if the operator does not equal + - * / %
       if(operator != '+' && operator != '-' && operator != '*' && operator != '/' && operator != '%'){
        //end the function here and pass the message below.
        objError.innerHTML = 'Argument 3 must be an arithmatic operator';
        return;
    }

    //if number 2 is not a number
    if(!isValidNumber(number2)){
        //end the function here and pass the message below.
        objError.innerHTML = 'Argument 2 must be a number';
        return;
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