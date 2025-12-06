// js/auth.js
import { auth, googleProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, db, doc, getDoc } from './firebase-config.js';

// 1. Google Sign In
document.getElementById('google-btn').addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        checkUserSetup(result.user);
    } catch (error) {
        alert(error.message);
    }
});

// 2. Phone Auth Setup
window.setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal'
    });
    window.recaptchaVerifier.render();
};

document.getElementById('send-otp-btn').addEventListener('click', () => {
    const phoneNumber = document.getElementById('phone-number').value;
    if(!window.recaptchaVerifier) setupRecaptcha();
    
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.getElementById('phone-login-step-1').classList.add('hidden');
            document.getElementById('phone-login-step-2').classList.remove('hidden');
        }).catch((error) => {
            alert("Error sending SMS: " + error.message);
        });
});

document.getElementById('verify-otp-btn').addEventListener('click', () => {
    const code = document.getElementById('verification-code').value;
    window.confirmationResult.confirm(code).then((result) => {
        checkUserSetup(result.user);
    }).catch((error) => {
        alert("Invalid Code");
    });
});

// 3. Router Logic (Check if new user or existing)
async function checkUserSetup(user) {
    const docRef = doc(db, "businesses", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // User already setup -> Go to Dashboard (To be built later)
        alert("Login Success! Redirecting to Dashboard...");
        // window.location.href = "dashboard.html"; 
    } else {
        // New User -> Go to Setup
        window.location.href = "setup.html";
    }
}
