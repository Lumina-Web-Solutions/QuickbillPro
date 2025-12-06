// js/setup.js
import { auth, db, doc, setDoc } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('setup-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const companyData = {
                name: document.getElementById('company-name').value,
                email: document.getElementById('company-email').value,
                gstin: document.getElementById('company-gstin').value || "Unregistered",
                logo: document.getElementById('company-logo').value,
                createdAt: new Date().toISOString(),
                ownerUid: user.uid
            };

            try {
                // Creates the individual database entry for this user
                await setDoc(doc(db, "businesses", user.uid), companyData);
                alert("Setup Complete! Database initialized.");
                // window.location.href = "dashboard.html"; // Redirect to main app
            } catch (error) {
                console.error("Error writing document: ", error);
                alert("Setup failed: " + error.message);
            }
        });
    } else {
        // Force login if not authenticated
        window.location.href = "index.html";
    }
});
