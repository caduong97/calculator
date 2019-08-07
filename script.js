const display = document.getElementById("display");

const formula = document.getElementById("formula");

const appendNothing = document.createTextNode("");

let calculated = false;

const numberInputHandler = (event) => {
    let appendToDisplay = document.createTextNode(event.target.innerText);    
    let appendToFormula = document.createTextNode(event.target.innerText);

    if(calculated === true ) {
        display.innerHTML = "";
        formula.innerHTML = "";
        display.appendChild(appendToDisplay); 
        formula.appendChild(appendToFormula);

        calculated = false;
    }

    if(display.innerText === "/" || display.innerText === "x" || display.innerText === "+" || display.innerText === "-") {
         display.innerHTML = '';
    }

    if(display.innerText === "0") {
        display.removeChild(display.childNodes[0]);
        display.appendChild(appendToDisplay);
        
        
        if (formula.innerText === "") {
            if (appendToFormula.nodeValue !== "0") {
                formula.appendChild(appendToFormula);
            }
            else {
                formula.appendChild(appendNothing);
            }
            
        } else {
            formula.appendChild(appendToFormula);
        }
        
    } else {
        display.appendChild(appendToDisplay); 
        formula.appendChild(appendToFormula);
    }


    console.log(formula.innerText);
}

const decimalInputHandler = (event) => {

    let appendToDisplay = document.createTextNode(event.target.innerText);    
    let appendToFormula = document.createTextNode(event.target.innerText);

    if(display.innerText === "0") {
        display.removeChild(display.childNodes[0]);
        let appendDecimal = document.createTextNode("0.");
        display.appendChild(appendDecimal);

        let appendDecimalToFormula = document.createTextNode("0.");
        
        formula.appendChild(appendDecimalToFormula);
    } else if (display.innerText.includes(".")) {
        display.appendChild(appendNothing);
        formula.appendChild(appendNothing);
    } else {
        display.appendChild(appendToDisplay); 
        formula.appendChild(appendToFormula);
    }
}

const operatorInputHandler = (event) => {

    let operator = '';

    switch(event.target.id) {
        case "divide":
            operator = '/';
            break;
        case "multiply":
            operator = '*';
            break;
        case "subtract":
            operator = '-';
            break;
        case "add":
            operator = '+';
            break;
    }

    let appendToDisplay = document.createTextNode(event.target.innerText);    
    let appendToFormula = document.createTextNode(operator);

    if (calculated === true) {
        formula.innerText = "";
        let appendNewCalc = document.createTextNode(display.innerText);
        formula.appendChild(appendNewCalc);
        
        calculated = false;
    }

    let displayLength = display.innerText.length;
    if (display.innerText[displayLength - 1] !== ".") {
        
            display.innerHTML = "";
            display.appendChild(appendToDisplay);

            let formulaLastChar = formula.innerText[formula.innerText.length - 1];
            if (formulaLastChar === "/" || formulaLastChar === "+" || formulaLastChar === "-" || formulaLastChar === "*") {
                let newFormula = formula.innerText.slice(0, formula.innerText.length - 1);
                formula.innerText = "";
                formula.innerText = newFormula;
                formula.appendChild(appendToFormula);
            } else {
                formula.appendChild(appendToFormula);
            }
    }
}

const calculation = () => {
    let result = 0;
    if( formula.innerText[formula.innerText.length -1] === "/" || 
        formula.innerText[formula.innerText.length -1] === "*" ||
        formula.innerText[formula.innerText.length -1] === "+" ||
        formula.innerText[formula.innerText.length -1] === "-" ||
        formula.innerText[formula.innerText.length -1] === "." 
    ) {
        let newFormula = formula.innerText.slice(0, formula.innerText.length - 1);
        formula.innerText = "";
        formula.innerText = newFormula;
        result = eval(newFormula);
    } else {
        result = eval(formula.innerText);
    }

    display.innerText = "";
    display.innerText = result;

    calculated = true;


}


const clear = document.getElementById("clear");
clear.onclick = () => {
    display.innerHTML = '0';
    formula.innerHTML = '';
}