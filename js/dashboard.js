// js/dashboard.js
import { auth, db, doc, getDoc } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is logged in, fetch company details
        const docRef = doc(db, "businesses", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Update UI with company data
            document.getElementById('company-name-sidebar').textContent = data.name;
            document.getElementById('welcome-message').textContent = `Welcome, ${data.name}`;
            
            if(data.logo) {
                document.getElementById('company-logo-sidebar').src = data.logo;
            }
        } else {
            // User logged in but no company data? Send to setup.
            window.location.href = "setup.html";
        }
    } else {
        // No user logged in, send to login page
        window.location.href = "index.html";
    }
});

// Logout Logic
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
});
