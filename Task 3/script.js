const celsiusInput = document.getElementById('celsius');
        const fahrenheitInput = document.getElementById('fahrenheit');
        const kelvinInput = document.getElementById('kelvin');

        // Function to round numbers to two decimal places
        const roundToTwo = (num) => {
            return +(Math.round(num + "e+2")  + "e-2");
        };

        // Main conversion logic function
        const convertTemperature = (event) => {
            const sourceId = event.target.id;
            const sourceValue = parseFloat(event.target.value);

            // If input is not a valid number (e.g., empty), clear other fields
            if (isNaN(sourceValue)) {
                celsiusInput.value = '';
                fahrenheitInput.value = '';
                kelvinInput.value = '';
                return;
            }

            // Perform conversions based on which input was changed
            switch (sourceId) {
                case 'celsius':
                    // C -> F
                    fahrenheitInput.value = roundToTwo((sourceValue * 9/5) + 32);
                    // C -> K
                    kelvinInput.value = roundToTwo(sourceValue + 273.15);
                    break;

                case 'fahrenheit':
                    // F -> C
                    celsiusInput.value = roundToTwo((sourceValue - 32) * 5/9);
                    // F -> K
                    kelvinInput.value = roundToTwo((sourceValue - 32) * 5/9 + 273.15);
                    break;

                case 'kelvin':
                    // K -> C
                    celsiusInput.value = roundToTwo(sourceValue - 273.15);
                    // K -> F
                    fahrenheitInput.value = roundToTwo((sourceValue - 273.15) * 9/5 + 32);
                    break;
            }
        };

        // Add event listeners to all input fields
        celsiusInput.addEventListener('input', convertTemperature);
        fahrenheitInput.addEventListener('input', convertTemperature);
        kelvinInput.addEventListener('input', convertTemperature);