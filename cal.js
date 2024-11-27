
let currentInput = "";  
let operator = null; 
let exponentValue = null; 


const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// Update the display
function updateDisplay(value) {
    display.value = value || "0";
}


function handleNumberInput(value) {
    if (value === "." && currentInput.includes(".")) {
        return;
    }
    currentInput += value;
    updateDisplay(currentInput);
}


function handleAction(action) {
    if (action === "clear") {
        clearCalculator();
    } else if (action === "backspace") {
        backspace();
        
    } else if (action === "percent") {
        handlePercent();
        
    } else if (action === "equals") {
        calculateResult();
        
    } else if (action === "sqrt") {
        handleSqrt();
        
    } else if (action === "sin") {
        handleTrigFunction(Math.sin);
        
    } else if (action === "cos") {
        handleTrigFunction(Math.cos);
        
    } else if (action === "tan") {
        handleTrigFunction(Math.tan);
        
    } else if (action === "exp") {
        handleExponent();
        
    } else if (action === "pi") {
        handlePi();
        
    } else {
        handleOperator(action); 
    }
}


function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = null;
    exponentValue = null;
    updateDisplay("0");
}


function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
}


function handlePercent() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}

// Handle square root
function handleSqrt() {
    if (currentInput) {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay(currentInput);
    }
}


function handleTrigFunction(func) {
    if (currentInput) {
        currentInput = func(parseFloat(currentInput)).toString(); 
        updateDisplay(currentInput);
    }
}

// Handle exponentiation (xⁿ)
function handleExponent() {
    if (currentInput) {
        exponentValue = parseFloat(currentInput);
        currentInput = ""; 
    }
}

function handlePi() {
    currentInput = Math.PI.toString(); 
    updateDisplay(currentInput);
}

//for basic functions stuff
function handleOperator(action) {
    if (currentInput) {
        if (previousInput && operator) {
            calculateResult(); 
        }
        operator = action; 
        previousInput = currentInput; 
        currentInput = ""; 
    }
}

function calculateResult() {
    if (operator && previousInput && currentInput) {
        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        let result;

        switch (operator) {
            case "add":
                result = a + b;
                break;
            case "subtract":
                result = a - b;
                break;
            case "multiply":
                result = a * b;
                break;
            case "divide":
                result = b !== 0 ? a / b : "Error";
                break;
            default:
                result = "Error";
        }

        currentInput = result.toString();
        operator = null;
        previousInput = "";
        updateDisplay(currentInput);
    } else if (exponentValue !== null) {
        
       
        currentInput = Math.pow(exponentValue, parseFloat(currentInput)).toString();
        exponentValue = null;
        updateDisplay(currentInput);
    }
}


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (value) {
            handleNumberInput(value);
        } else if (action) {
            handleAction(action);
        }
    });
});