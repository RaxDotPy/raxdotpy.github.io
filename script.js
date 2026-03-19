// ===============================
// HOW JS CONNECTS TO HTML
// document.querySelector() -> finds ONE element
// document.querySelectorAll() -> finds ALL matching elements
// Both take the same selectors you use in CSS:
// '#id', '.class', 'tag', etc.
// ===============================

// ===============================
// FEATURE 1: FADE-IN ANIMATION ON SCROLL
//
// How it works:
// 1. All sections start invisible (via CSS).
// 2. IntersectionObserver watches each section
// 3. When a section enters the viewport, we add the class "visible" to it
// 4. CSS transitions handle the actual animation
// ===============================

// Grab every <section> on the page as an array-like list

const sections = document.querySelectorAll('section');

// IntersectionObserver fires a callback whenenver a watched element enters or exits the viewport.
// `entries` is the list of elements being observed.
const fadeObserver = new IntersectionObserver((entries)=> {
    entries.forEach((entry) => {
        // entry.isIntersecting = true when the element is visible
        if (entry,isIntersecting) {
            entry.target.classList.add('visible'); // triggers CSS animation
            fadeObserver.unobserve(entry.target); // stop watching once animated
        }

    })
}, {
    threshold: 0.15 // trigger when 15% of the section is visible
});

// Tell the observer to watch each section
sections.forEach((section) => {
    fadeObserver.observe(section);
});

// ===============================
// FEATURE 2: CONTACT FORM VALIDATION
//
// How it works:
// 1. Listen for the form's "submit" event.
// 2. Prevent the default browser behavior (which would refresh the page).
// 3. Validate each field manually
// 4. Show errors OR a success message
// ===============================

// Grab the form element by its id
const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {

    // Prevent the page from realoding on submit
    event.preventDefault();

    // Read the current value of each input field
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // --- Validation ---
    // We'll collect any errors in an array
    const errors = [];

    if (name.length < 2) {
        errors.push('Please enter your name.');
    }

    // Simple email check: must containt "@" and "."
    if (!email.includes('@') || !email.includes('.')) {
        errors.push('Please enter a valid email address.');
    }

    if (message.length < 10) {
        errors.push('Message must be at least 10 characters long.');
    }

    // --Show result --
    // Remove any existing message before showing a new one.

    clearMessage();

    if (errors.length > 0) {
        // Something is wrong - show errors in red
        showMessage(errors.join(' '), 'error');
    } else {
        // Everything looks good!
        showMessage('Message sent! I\'ll get back to you soon.', 'success');
        form.reset(); // Clear the form fields
    }

});

// ===============================
// HELPER FUNCTIONS
//
// These are small reusable functions that keep the code above clean and readable.
// ===============================

// Creates and injects feedback message below the form
function showMessage(text, type) {
    const msg = document.createElement('p'); // create a new <p> element
    msg.id = 'form-message';
    msg.textContent =text; // set its text content
    msg.className = 'form-message ' + type; // add class for styling (error or success)
    form.appendChild(msg); // add it to the end of the form
}

// Removes the feedback message if it already exists
function clearMessage() {
    const existing = document.getElementById('form-message');
    if (existing) existing.remove();
}