let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    if (number === '.' && currentValue.includes('.')) return;
    
    // Replace initial 0 with the number (unless it's a decimal point)
    if (currentValue === '0' && number !== '.') {
        currentValue = number;
    } else {
        currentValue += number;
    }
    
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null && !shouldResetDisplay) {
        calculate();
    }
    
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operation === null || shouldResetDisplay) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    // Round to avoid floating point errors
    currentValue = Math.round(result * 100000000) / 100000000;
    currentValue = currentValue.toString();
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteDigit() {
    if (currentValue.length === 1 || currentValue === '0') {
        currentValue = '0';
    } else {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === '%') {
        appendOperator('%');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        deleteDigit();
    }
});
