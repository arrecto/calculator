const index = document.querySelectorAll('button');
const screen = document.querySelector('#screen');

/* index values for the button NODES
0: button#power
1: button#memory-add
2: button#memory-subtract
3: button#backspace
4: button#7
5: button#8
6: button#9
7: button#divide
8: button#4
9: button#5
10: button#6
11: button#multiply
12: button#1
13: button#2
14: button#3
15: button#subtract
16: button#decimal
17: button#0
18: button#equal
19: button#add*/

let power = false;
let screenDisplay = "";
let keyPressed="";
let convertToArray = [];
let result;
let previousIndex = 0;
let tempValueString = "";

var re = RegExp( /[*+-/]/, "g" );

function printToScreen(e){
    keyPressed=e.path[0].id;
    if(keyPressed == "divide")
        keyPressed = "/";
    else if (keyPressed == "multiply")
        keyPressed = "*";
    else if (keyPressed == "subtract")
        keyPressed = "-";
    else if (keyPressed == "add")
        keyPressed = "+";
    screenDisplay += keyPressed;
    screen.textContent=screenDisplay;
}

function errorEquation(){
    console.log('error');
}

function performOperation(){
    console.log('good');
}

function validateEquation(){
    for(i=0;i<screenDisplay.length;i++)
    {
        if(screenDisplay[i]=='+'||
            screenDisplay[i]=='-'||
            screenDisplay[i]=='*'|| 
            screenDisplay[i]=='/'||
            i==screenDisplay.length-1)
            {for(j=previousIndex;j<=i;j++)
                tempValueString += screenDisplay[j];
            previousIndex = i+1;
            convertToArray.push(parseInt(tempValueString));
            if(i!=screenDisplay.length-1)
                convertToArray.push(screenDisplay[i]);
            tempValueString = "";
        }
    }
    //convertToArray = convertToArray.splice(1,convertToArray.length)
    console.log(convertToArray); //test
    for(i=0;i<convertToArray.length;i+=2)
        console.log(convertToArray[i], typeof convertToArray[i], typeof convertToArray[i]=='number', convertToArray[i+1], re.test(convertToArray[i+1]));
        if(typeof convertToArray[i]=='number'&&(re.test(convertToArray[i+1])||i==convertToArray.length-1))
            if(i==convertToArray.length-1)
                performOperation();
        else
            errorEquation();
    }

function powerOn(e){
    power=true;
    screen.textContent = '0';
    screenDisplay = "";
    keyPressed="";
    convertToArray = [];
    result = 0;
    previousIndex = 0;
    tempValueString = "";

    for(i=4;i<=19&&power;i++){
        if(i!=18)
        index[i].addEventListener('click', printToScreen);
    }
    index[18].addEventListener('click', validateEquation)
}

index[0].addEventListener('click', powerOn);