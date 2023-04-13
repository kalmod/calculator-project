// const keypad = document.querySelector('#keypad');

const keypadClassNames = ['clear','div', 'multi', 'min', 'num','plus','zero0','deci','equals'];
const keypadClassSymbols = {'clear':'C','div':'/', 'multi':'*', 'min':'-', 'num':'','plus':'+','zero0':'0','deci':'.','equals':'=',
                        'n1':'1','n2':'2','n3':'3','n4':'4','n5':'5','n6':'6','n7':'7','n8':'8','n9':'9'};
const keyboardToSymbols = {"Numpad0": "zero0", "NumpadDecimal": "deci", "NumpadEnter": "equals", "Numpad1": "n1", "Numpad2": "n2", 
"Numpad3": "n3", "Numpad4": "n4", "Numpad5": "n5", "Numpad6": "n6", "Numpad7": "n7", "Numpad8": "n8", "Numpad9": "n9", 
"NumpadAdd": "plus", "NumpadSubtract": "min", "NumpadMultiply": "multi", "NumpadDivide": "div", "KeyC": "clear" }


const cubeFaces = ['front','right','back','left','top'];

const scene = document.querySelector('#scene');
const upBTN = document.querySelector('.upBTN');
const downBTN = document.querySelector('.downBTN');
const leftBTN = document.querySelector('.leftBTN');
const rightBTN = document.querySelector('.rightBTN');


const screenHistory = document.querySelector('.screen-history');
const screen = document.querySelector('.screen');

let operand = ''; //this is always the current number we're working on.
let mathEquation = []; //this is the entire statement.

const add = function(a,b){
    return Math.round( (parseFloat(a) + parseFloat(b)) * 100) / 100;
}
const subtract = function(a,b){
    return Math.round( (parseFloat(a) - parseFloat(b)) * 100 ) / 100;
}
const multiply = function(a,b){
    return Math.round ( (parseFloat(a) * parseFloat(b)) * 100 ) / 100 ;
}
const divide = function(a,b){
    return Math.round ( (parseFloat(a) / parseFloat(b)) * 100 ) / 100 ;
}

const operations = {'+': add, '-':subtract, '*':multiply, '/':divide }


populateKeypad();
populateNumbers();

for (let keypad in keypadClassSymbols){
    create3dButton(keypad);
}




function populateKeypad(){
    const keypad = document.querySelector('#keypad');

    // createButton(keypad,keypadClassNames[0]);
    // createButton(keypad,keypadClassNames[1]);
    keypadClassNames.forEach(className => {
        createButton(keypad,className);
    });
    
}

function populateNumbers(){
    const keypad = document.querySelector('#keypad');
    for (let i = 1; i < 10;i++){
        createButton(keypad,`n${i}`);

    }
}


function createButton(parentElement,className){
    const newButton = document.createElement('div');
    newButton.classList.add(className);
    newButton.setAttribute('style',`grid-area:${className}`);
    // newButton.textContent = keypadClassSymbols[className];
    parentElement.appendChild(newButton);
}






function create3dButton(selectedClass){
    const className = `.${selectedClass}`;
    const testbutton = document.querySelector(`${className}`);
    const buttonElement = document.createElement('div');
    cubeFaces.forEach((face)=>{createButton(buttonElement,face)})
    buttonElement.classList.add('buttonCube');


    testbutton.appendChild(buttonElement);
    
    document.querySelector(`${className} > .buttonCube > .top`).style.width = `${testbutton.clientWidth}px`;
    document.querySelector(`${className} > .buttonCube > .top`).style.height = `${testbutton.clientHeight}px`;
    document.querySelector(`${className} > .buttonCube > .top`).textContent = keypadClassSymbols[selectedClass];
    
    document.querySelector(`${className} > .buttonCube > .front`).style.setProperty('--ztranslation-distance-h',`${Math.floor(testbutton.clientHeight/2)}px`);
    document.querySelector(`${className} > .buttonCube > .front`).style.setProperty('--cubeWidth',`${testbutton.clientWidth}px`);

    document.querySelector(`${className} > .buttonCube > .back`).style.setProperty('--ztranslation-distance-h',`${Math.floor(testbutton.clientHeight/2)}px`);
    document.querySelector(`${className} > .buttonCube > .back`).style.setProperty('--cubeWidth',`${testbutton.clientWidth}px`);

    document.querySelector(`${className} > .buttonCube > .right`).style.setProperty('--ztranslation-distance-w',`${Math.floor(testbutton.clientWidth/2)}px`);
    document.querySelector(`${className} > .buttonCube > .right`).style.setProperty('--cubeWidth',`${testbutton.clientHeight}px`);

    document.querySelector(`${className} > .buttonCube > .left`).style.setProperty('--ztranslation-distance-w',`${Math.floor(testbutton.clientWidth/2)}px`);
    document.querySelector(`${className} > .buttonCube > .left`).style.setProperty('--cubeWidth',`${testbutton.clientHeight}px`);
}


const numPadButtons = document.querySelectorAll('.buttonCube');

numPadButtons.forEach((numPadButton)=>{
    numPadButton.addEventListener('click', function(){
        this.classList.add('click-animation');
        setTimeout(()=>{
            this.classList.remove('click-animation');
        },250);
        equationBuilder(this.textContent);
    })
    window.addEventListener('keypress',function(e){
        // console.log(numPadButton.parentElement.classList.contains(keyboardToSymbols[e.code]), e.code)
        if (numPadButton.parentElement.classList.contains(keyboardToSymbols[e.code])){
            numPadButton.classList.add('click-animation');
            setTimeout(()=>{
                numPadButton.classList.remove('click-animation');
            },250);
            equationBuilder(numPadButton.textContent);
        }
    })
})

// accepts text content and handles behavior to build an equation.
function equationBuilder(keyPad){
    // console.log(keyPad);
    if (keyPad === 'C') {
        operand = '';
        mathEquation = [];
        screenHistory.textContent = '';
    }
    else if (keyPad === '='){
        mathEquation.push(operand);
        screenHistory.textContent= mathEquation.join('');
        operand = `${equationResolver(mathEquation)}`
        mathEquation = [];
    } else if (['+','/','*','-'].includes(keyPad)){
        if (['+','/','*','-'].includes(mathEquation[mathEquation.length-1]) && operand === ''){
            mathEquation[mathEquation.length-1] = keyPad;
        } else if (operand.length > 0){
            mathEquation.push(...[operand,keyPad]);
            operand = '';
        }
    } else {
        operand+=keyPad;
    };

    screen.textContent = `${mathEquation.join(' ')} ${operand}`;
   
}

function equationResolver(arrayOfNumbers){
    while (arrayOfNumbers.length > 1){
        let [a, o, b] = [...arrayOfNumbers.splice(0,3)];   
        let result = operations[o](a,b);
        
        arrayOfNumbers.unshift(result)
    }
    return arrayOfNumbers[0];
}

let counter;
upBTN.addEventListener('mousedown', function (e){
    counter = setInterval(function(){
        const sceneStyle = getComputedStyle(scene).getPropertyValue('transform');
        const matrix = sceneStyle.split('(')[1].split(')')[0].split(',');
        let [ x,y,z ] = getDegreesFromMatrix(matrix);
        scene.style.transform = `rotateX(${x+5}deg) rotateY(${y}deg)`;
    },75)
});
upBTN.addEventListener('mouseup', function (e){
    clearInterval(counter);
});
upBTN.addEventListener('mouseleave', function (e){
    clearInterval(counter);
});
downBTN.addEventListener('mousedown', function(e){
    counter = setInterval(function(){
        const sceneStyle = getComputedStyle(scene).getPropertyValue('transform');
        const matrix = sceneStyle.split('(')[1].split(')')[0].split(',');
        let [ x,y,z ] = getDegreesFromMatrix(matrix);
        scene.style.transform = `rotateX(${x-5}deg) rotateY(${y}deg)`;
    },75)
});
downBTN.addEventListener('mouseup', function(e){
    clearInterval(counter);
});
downBTN.addEventListener('mouseleave', function(e){
    clearInterval(counter);
});

leftBTN.addEventListener('mousedown', function(e){
    counter = setInterval(function(){
        const sceneStyle = getComputedStyle(scene).getPropertyValue('transform');
        const matrix = sceneStyle.split('(')[1].split(')')[0].split(',');
        let [ x,y,z ] = getDegreesFromMatrix(matrix);
        scene.style.transform = `rotateX(${x}deg) rotateY(${y-5}deg)`;
    },75)
});
leftBTN.addEventListener('mouseup', function(e){
    clearInterval(counter);
});
leftBTN.addEventListener('mouseleave', function(e){
    clearInterval(counter);
});

rightBTN.addEventListener('mousedown', function(e){
    counter = setInterval(function(){
        const sceneStyle = getComputedStyle(scene).getPropertyValue('transform');
        const matrix = sceneStyle.split('(')[1].split(')')[0].split(',');
        let [ x,y,z ] = getDegreesFromMatrix(matrix);
        scene.style.transform = `rotateX(${x}deg) rotateY(${y+5}deg)`;
    },75);
});
rightBTN.addEventListener('mouseup', function(e){
    clearInterval(counter);
});
rightBTN.addEventListener('mouseleave', function(e){
    clearInterval(counter);
});


function getDegreesFromMatrix(matrix){

    const radToDeg = (rad) => rad * 180 / Math.PI;

    const a11 = matrix[0];
    const a12 = matrix[1];
    const a13 = matrix[2];
    const a21 = matrix[4];
    const a22 = matrix[5];
    const a23 = matrix[6];
    const a31 = matrix[8];
    const a32 = matrix[9];
    const a33 = matrix[10];

    const xRot = radToDeg(Math.atan2(-a32, a33));
    const yRot = radToDeg(Math.asin(a31));
    const zRot = radToDeg(Math.atan2(-a21, a11));

    const xDeg = (xRot < 0 ) ? xRot + 360  : xRot;
    const yDeg = (yRot < 0 ) ? yRot + 360  : yRot;
    const zDeg = (zRot < 0 ) ? zRot + 360 : zRot;

    return [xDeg, yDeg, zDeg]

}


function updateRotation(x,y,z){
    console.log(x);
    const cosX = Math.cos(x * Math.PI / 180);
    const sinX = Math.sin(x * Math.PI / 180);
    const cosY = Math.cos(y * Math.PI / 180);
    const sinY = Math.sin(y * Math.PI / 180);
    const cosZ = Math.cos(z * Math.PI / 180);
    const sinZ = Math.sin(z * Math.PI / 180);

    const newTransform = `matrix3d(${cosY*cosZ}, ${cosX*sinZ + sinX*sinY*cosZ}, ${sinX*sinZ - cosX*sinY*cosZ}, 0, ${-cosY*sinZ}, ${cosX*cosZ - sinX*sinY*sinZ}, ${sinX*cosZ + cosX*sinY*sinZ}, 0, ${sinY}, ${-sinX*cosY}, ${cosX*cosY}, 0, 0, 0, 0, 1)`;
    return newTransform;
}