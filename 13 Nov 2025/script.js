// A common practice is to wrap the code in a function 
// that runs when the entire page is loaded.
document.addEventListener('DOMContentLoaded', function() {
    // 1. *DOM Manipulation / Element Selection*
    // Select the button and the result paragraph using their IDs.
    const checkButton = document.getElementById('checkButton');
    const resultElement = document.getElementById('result');
    const inputElement = document.getElementById('checkNum');

    // 2. *Event Listener*
    // Attach a function (called a "callback") to the button's 'click' event.
    // This function will execute ONLY when the button is clicked.
    checkButton.addEventListener('click', checkNumberStatus);

    // This is the function that runs when the button is clicked.
    function checkNumberStatus() {
        // Get the value and convert it to a floating-point number
        const number = parseFloat(inputElement.value);

        let statusMessage = "";
        let statusClass = "";
        
        // 3. **Conditional Statements (if/else if/else)**
        if (number > 0) {
            // The number is Positive
            statusMessage = "The number is *POSITIVE*.";
            statusClass = "positive";
            
        } else if (number < 0) {
            // The number is Negative
            statusMessage = "The number is *NEGATIVE*.";
            statusClass = "negative";
            
        } else if (number === 0) {
            // The number is Zero
            statusMessage = "The number is Neutral (Zero).";
            statusClass = "Neutral";

        } else {
            // Handle cases where the input is not a valid number (NaN)
            statusMessage = "Please enter a valid number.";
            statusClass = ""; // Clear class for invalid input
        }

        // 4. *DOM Manipulation / Output*
        // Update the text and the CSS class of the result element
        resultElement.textContent = statusMessage;
        resultElement.className = statusClass;
    }
});