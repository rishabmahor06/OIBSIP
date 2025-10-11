 // Get the display element
        const display = document.getElementById('display');
        // Get the keys container
        const keys = document.querySelector('.calculator-keys');

        // State variables
        let displayValue = '0';
        let firstOperand = null;
        let operator = null;
        let waitingForSecondOperand = false;

        // Function to update the display
        function updateDisplay() {
            display.value = displayValue;
        }
        updateDisplay(); // Initialize display

        // Event listener for all key presses
        keys.addEventListener('click', (event) => {
            const { target } = event; // Destructure target from the event object
            
            // Exit if the clicked element is not a button
            if (!target.matches('button')) {
                return;
            }

            // Handle different button types
            if (target.classList.contains('operator')) {
                handleOperator(target.value);
            } else if (target.classList.contains('special')) {
                handleSpecial(target.value);
            } else {
                inputDigit(target.value);
            }
            
            updateDisplay();
        });

        // Function to handle number and decimal inputs
        function inputDigit(digit) {
            if (waitingForSecondOperand) {
                displayValue = digit;
                waitingForSecondOperand = false;
            } else {
                // Overwrite '0' if it's the current value, otherwise append
                displayValue = displayValue === '0' ? digit : displayValue + digit;
            }
            
            // Handle decimal point input
            if (digit === '.') {
                if (!displayValue.includes('.')) {
                    displayValue += '.';
                }
            }
        }

        // Function to handle operators (+, -, *, /, =, %)
        function handleOperator(nextOperator) {
            const inputValue = parseFloat(displayValue);

            // Handle the '%' operator
            if (nextOperator === '%') {
                displayValue = String(inputValue / 100);
                return;
            }

            if (operator && waitingForSecondOperand) {
                operator = nextOperator;
                return;
            }

            if (firstOperand === null && !isNaN(inputValue)) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = calculate(firstOperand, inputValue, operator);
                displayValue = `${parseFloat(result.toFixed(7))}`; // Format to avoid long decimals
                firstOperand = result;
            }

            waitingForSecondOperand = true;
            operator = nextOperator;
        }
        
        // Function to handle special keys (AC, DEL)
        function handleSpecial(key) {
             switch (key) {
                case 'AC': // All Clear
                    displayValue = '0';
                    firstOperand = null;
                    operator = null;
                    waitingForSecondOperand = false;
                    break;
                case 'DEL': // Delete last character
                    if (displayValue.length > 1) {
                        displayValue = displayValue.slice(0, -1);
                    } else {
                        displayValue = '0';
                    }
                    break;
            }
        }

        // The core calculation logic
        function calculate(first, second, op) {
            if (op === '+') return first + second;
            if (op === '-') return first - second;
            if (op === '*') return first * second;
            if (op === '/') return first / second;
            return second; // for '='
        }