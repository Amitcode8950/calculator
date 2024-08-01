document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.textContent = '0';
                return;
            }

            if (value === '=') {
                if (operator && previousInput !== '' && currentInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = null;
                }
                return;
            }

            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        currentInput = calculate(previousInput, currentInput, operator);
                    }
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
                return;
            }

            currentInput += value;
            display.textContent = currentInput;
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '';
        }
    }
})