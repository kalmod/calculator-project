// const keypad = document.querySelector('#keypad');

// keypadClassNames = ['clear','div', 'multi', 'min', 'num','plus','zero0','deci','equals'];
// keypadClassSymbols = {'clear':'C','div':'/', 'multi':'*', 'min':'-', 'num':'','plus':'+','zero0':'0','deci':'.','equals':'=',
//                         'n1':'1','n2':'2','n3':'3','n4':'4','n5':'5','n6':'6','n7':'7','n8':'8','n9':'9'};

keypadClassNames = [,'div', 'multi', 'min','plus','zero0','deci','equals'];
keypadClassSymbols = {'div':'/', 'multi':'*', 'min':'-', 'plus':'+','zero0':'0','deci':'.','equals':'=',
                        'n1':'1','n2':'2','n3':'3','n4':'4','n5':'5','n6':'6','n7':'7','n8':'8','n9':'9'};


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
    newButton.textContent = keypadClassSymbols[className];
    parentElement.appendChild(newButton);

}

populateKeypad();
populateNumbers();

const numPadButton = document.querySelector('.buttonCube');
numPadButton.addEventListener('click', function(){
    this.classList.add('click-animation');
    setTimeout(() => {
        this.classList.remove('click-animation');
    }, 250)
})