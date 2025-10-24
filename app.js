// --- STEP 5b: INITIALIZE FIREBASE ---

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! IMPORTANT: PASTE YOUR FIREBASE CONFIG OBJECT HERE
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// You got this from Step 3 in the Firebase Console.
const firebaseConfig = {
 apiKey: "AIzaSyBhUXJqjFiygvNx60CA4R8HrfZ2ghV8GCA",
    authDomain: "contexluma-authcation.firebaseapp.com",
    projectId: "contexluma-authcation",
    storageBucket: "contexluma-authcation.firebasestorage.app",
    messagingSenderId: "446271009223",
    appId: "1:446271009223:web:3b5df78c8b9c43806669e2",
    measurementId: "G-2ZPY3K5VYX"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a shortcut variable for the auth service
const auth = firebase.auth();


// --- STEP 6: IMPLEMENT AUTHENTICATION ---

// Get references to all the HTML elements we need
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

const loggedOutButtons = document.getElementById('logged-out-buttons');
const userStatus = document.getElementById('user-status');


// --- 1. Sign Up New Users ---
signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Use the 'createUserWithEmailAndPassword' function
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Sign-up successful
            console.log('User signed up:', userCredential.user);
            alert('Sign up successful! You are now logged in.');
        })
        .catch((error) => {
            // Handle errors
            console.error('Sign up error:', error.message);
            alert(error.message); // Show a simple error message
        });
});


// --- 2. Log In Existing Users ---
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Use the 'signInWithEmailAndPassword' function
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Sign-in successful
            console.log('User logged in:', userCredential.user);
            alert('Log in successful!');
        })
        .catch((error) => {
            // Handle errors
            console.error('Log in error:', error.message);
            alert(error.message); // Show a simple error message
        });
});


// --- 3. Log Out Users ---
logoutBtn.addEventListener('click', () => {
    // Use the 'signOut' function
    auth.signOut()
        .then(() => {
            console.log('User logged out');
            alert('You have been logged out.');
        })
        .catch((error) => {
            // Handle errors
            console.error('Log out error:', error.message);
            alert(error.message);
        });
});


// --- 4. Listen for Authentication State Changes ---
// This is the most important part. It runs when the page loads
// and any time the user's login state changes.
auth.onAuthStateChanged((user) => {
    if (user) {
        // --- User is LOGGED IN ---
        console.log('Auth state changed: User is logged in.', user.email);
        
        // Update the UI
        userStatus.textContent = `Logged in as: ${user.email}`;
        userStatus.classList.add('bg-green-100', 'text-green-800');
        userStatus.classList.remove('bg-gray-50', 'text-gray-700');

        // Hide login/signup buttons
        loggedOutButtons.style.display = 'none';
        
        // Show logout button
        logoutBtn.style.display = 'block';

        // Clear password field for security
        passwordInput.value = '';

    } else {
        // --- User is LOGGED OUT ---
        console.log('Auth state changed: User is logged out.');
        
        // Update the UI
        userStatus.textContent = 'Logged out';
        userStatus.classList.remove('bg-green-100', 'text-green-800');
        userStatus.classList.add('bg-gray-50', 'text-gray-700');

        // Show login/signup buttons
        loggedOutButtons.style.display = 'grid';

        // Hide logout button
        logoutBtn.style.display = 'none';

        // Clear both fields
        emailInput.value = '';
        passwordInput.value = '';
    }
});

