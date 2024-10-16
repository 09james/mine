 // Function to validate password confirmation
function validatePassword() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
    return true;
}

// Function to handle signup
document.getElementById("signup").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fName, lName, email, password }),
        });

        if (response.ok) {
            alert("Signup successful! You can now log in.");
            // Optionally, you could redirect to the login page or show a login form
            document.getElementById("signup").style.display = "none"; // Hide signup
            document.getElementById("signIn").style.display = "block"; // Show login
        } else {
            const errorMessage = await response.text();
            alert(errorMessage); // Show an alert for error messages
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing up.');
    }
});

// Function to handle login
document.querySelector('#signIn form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Successful login, redirect to home.html
            window.location.href = '/home.html';
        } else {
            const errorMessage = await response.text();
            alert(errorMessage); // Show an alert for error messages
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    }
});

// Toggle between signup and login forms
document.getElementById("signUpButton").addEventListener("click", function() {
    document.getElementById("signup").style.display = "block"; // Show signup
    document.getElementById("signIn").style.display = "none"; // Hide login
});

document.getElementById("signInButton").addEventListener("click", function() {
    document.getElementById("signup").style.display = "none"; // Hide signup
    document.getElementById("signIn").style.display = "block"; // Show login
});
