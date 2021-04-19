/*-----Global Variables -----*/
//set on the top, with blank values
let number1 = "", number2 = "", operator = "", blnEquals=false;

/*---- Selecting elements ----*/

//querySelectorAll -is a function
var arrNumbers = document.querySelectorAll(".number"); //can hold more than one value at a time number1, number2 etc
//selects the operator elements
// console.log(arrNumbers);
var arrOperators = document.querySelectorAll(".operator"); //all of the items that match operator addition, division etc
// console.log(arrOperators); 
//object is a single item
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

//numbers and operatoors preview
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
//calls the clear function
objClear.addEventListener("click", clear);
//calls the equals function
objEquals.addEventListener("click", equals);
//calls the preview function
objDecimal.addEventListener("click", preview);

//to make calculator do the maths
/*----- Functions -----*/

function preview(event){
    console.log(blnEquals)
    // console.log(event.target.innerHTML);
    var currentItem = event.target.innerHTML;
    var dataType;
    var strMessage; 
    // if operator been selected the dataType variable is set to operator.
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
        //if there is a number 2
        //number 1is set to the calculator function arguments
        if(number2){
            number1 = calculator(number1, number2, operator);
            number2 = "";
            //the maths box is empty
            objMaths.innerHTML = "";
        }
        
        
        if(number1){
            operator = currentItem;
            strMessage = number1 + ' ' + operator;
        } else {
        //error message if starts with operator
            objError.innerHTML = 'You cannot set an operator without a number being set';
            return;
        }
    } else {
        //if equals was used recently, unset the equals boolean
        if (blnEquals){
            number1 = "";
            blnEquals=false;
        }
        //if it is an operator
        if(operator){
            if(number2){
                if(currentItem == '.'){
                    //if the currentItem pressed is equal to decimal
                    if(!hasDecimal(number1)){
                        number2 += currentItem;
                    }
                } else {

                //set number2 equals to the currentItem
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

//clear when operator presses AC
function clear(event){
    number1 = ""; //resets the value completely
    number2 = "";
    operator = "";
    objPreview.innerHTML = ""; //individual inputs, removes the value
    objMaths.innerHTML = "";
    objPrevious.innerHTML = "";
    objError.innerHTML = ""; // a P tag
}


function equals(){
    //if there is a sum
    var sum = calculator(number1,number2,operator);
    if(sum){  
        objMaths.innerHTML = ""; //the maths element box will be empty  
        objPrevious.innerHTML = objPreview.innerHTML;
        objMaths.innerHTML = sum;
        blnEquals = true;
        number1 = sum;
        number2 = "";
        operator = "";
    }
}
//indexOf returns -1 if it find the string passed to the argument
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