// const keypad = document.querySelector('#keypad');

const keypadClassNames = ['clear','div', 'multi', 'min', 'num','plus','zero0','deci','equals'];
const keypadClassSymbols = {'clear':'C','div':'/', 'multi':'*', 'min':'-', 'num':'','plus':'+','zero0':'0','deci':'.','equals':'=',
                        'n1':'1','n2':'2','n3':'3','n4':'4','n5':'5','n6':'6','n7':'7','n8':'8','n9':'9'};
const cubeFaces = ['front','right','back','left','top'];
const screen = document.querySelector('.screen');
const screenHistory = document.querySelector('.screen-history');
let operand = '';
let mathEquation = [];

const add = function(a,b){
    return parseInt(a) + parseInt(b);
}
const subtract = function(a,b){
    return parseInt(a) - parseInt(b);
}
const multiply = function(a,b){
    return parseInt(a) * parseInt(b);
}
const divide = function(a,b){
    return parseInt(a) / parseInt(b);
}


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
    // document.querySelector(`${className} > .buttonCube > .top`).style.setProperty('--ztranslation-distance',`${Math.floor((document.querySelector(`${className} > .buttonCube > .front`)).clientHeight/2)}px`)
    
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
        // console.log(this.textContent, this.classList, this.parentElement.classList);
        console.log(this.textContent);
        if (this.textContent === 'C') {
            operand = '';
            mathEquation = [];
            screenHistory.textContent = '';
        }
        else if (this.textContent === '='){
            mathEquation.push(operand);
            console.log(mathEquation.join(''), mathEquation);
            screenHistory.textContent= mathEquation.join('');
            operand = '';
            mathEquation = [];
        } else if (['+','/','*','-'].includes(this.textContent)){
            if (['+','/','*','-'].includes(mathEquation[mathEquation.length-1]) && operand === ''){
                mathEquation[mathEquation.length-1] = this.textContent;
            } else if (operand.length > 0){
                mathEquation.push(...[operand,this.textContent]);
                operand = '';
            }
        } else {
            operand+=this.textContent;
        };
        screen.textContent = `${mathEquation.join(' ')} ${operand}`;
    })

})