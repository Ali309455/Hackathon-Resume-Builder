// console.log(document.getElementById('resumeForm'));


document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Create a new FormData object
    const formData = new FormData(event.target);

    // Convert FormData to a regular object
    const formObj = {};
    formData.forEach((value, key) => {
        // Handle multiple input names (like education, experience)
        if (formObj[key]) {
            if (!Array.isArray(formObj[key])) {
                formObj[key] = [formObj[key]]; // Convert to an array if it's not already
            }
            formObj[key].push(value); // Add new value to the existing array
        } else {
            formObj[key] = value;
        }
    });

    console.log(formObj); // Display the collected data in the console

    // Example: You can now use this data to generate a resume, send it to a server, etc.
});
