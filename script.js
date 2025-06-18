const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = passwordInput.value;

    // Basic front-end check (for demo purposes only)
    if (email === 'admin@example.com' && password === 'password123') {
        alert('Login successful!');
        errorMsg.textContent = '';
    } else {
        errorMsg.textContent = 'Invalid email or password.';
    }
});
