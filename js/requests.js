// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    var form = document.querySelector("form");

    // Add an event listener for form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Show confirmation popup
        alert("Request submitted!");

        // Refresh the page after 5 seconds
        setTimeout(function() {
            location.reload();
        }, 5000);
    });
});
