
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =============================
// Firebase Configuration
// =============================

const firebaseConfig = {
    apiKey: "AIzaSyAMpEEVR04IamKNSU6e_NF1mfOKri-5Yrw",
    authDomain: "work-space-aed69.firebaseapp.com",
    projectId: "work-space-aed69",
    storageBucket: "work-space-aed69.firebasestorage.app",
    messagingSenderId: "134615324990",
    appId: "1:134615324990:web:346d91563e063f35ffb46f",
    measurementId: "G-3P8QL2R5KN"
};


// =============================
// Initialize Firebase
// =============================

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// =============================
// Elements
// =============================

const loginForm = document.getElementById("customerLoginForm");
const loginMessage = document.getElementById("customerLoginMessage");

const emailInput = document.getElementById("customerEmail");
const passwordInput = document.getElementById("customerPassword");

const forgotPasswordLink = document.getElementById("forgotPasswordLink");


// =============================
// Forgot Password
// =============================

forgotPasswordLink.addEventListener("click", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    // Check email
    if (!email) {
        loginMessage.textContent = "Please enter your email first.";
        emailInput.focus();
        return;
    }

    if (!emailInput.checkValidity()) {
        loginMessage.textContent = "Please enter a valid email address.";
        emailInput.focus();
        return;
    }

    // Prevent repeated clicks while sending
    forgotPasswordLink.style.pointerEvents = "none";
    loginMessage.textContent = "Sending password reset email...";

    try {
        await sendPasswordResetEmail(auth, email);

        // Generic message to avoid revealing whether an account exists
        loginMessage.textContent =
            "If an account exists for this email, a password reset link has been sent. Please check your inbox and spam folder.";

    } catch (error) {
        console.error("Password Reset Error:", error);

        if (
            error.code === "auth/invalid-email"
        ) {
            loginMessage.textContent =
                "Please enter a valid email address.";

        } else if (
            error.code === "auth/too-many-requests"
        ) {
            loginMessage.textContent =
                "Too many attempts. Please wait a while and try again.";

        } else if (
            error.code === "auth/network-request-failed"
        ) {
            loginMessage.textContent =
                "Network error. Check your internet connection and try again.";

        } else {
            loginMessage.textContent =
                "Could not send the reset email. Please check your Firebase settings and try again.";
        }

    } finally {
        forgotPasswordLink.style.pointerEvents = "";
    }
});


// =============================
// Login
// =============================

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    loginMessage.textContent = "Logging in...";

    try {
        // Login with Firebase
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        loginMessage.textContent = "Login successful!";

        // Get current user data
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        // Check booking redirect
        const redirect = sessionStorage.getItem("bookingRedirect");

        // If came from booking
        if (redirect) {
            sessionStorage.removeItem("bookingRedirect");

            window.location.href = redirect;
            return;
        }

        // Check Admin / Moderator Role
        if (
            userSnapshot.exists() &&
            (
                userSnapshot.data().role === "admin" ||
                userSnapshot.data().role === "moderator"
            )
        ) {
            window.location.href = "admin.html";
            return;
        }

        // Normal customer
        window.location.href = "account.html";

    } catch (error) {
        console.error("Customer Login Error:", error);

        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password"
        ) {
            loginMessage.textContent =
                "Invalid email or password.";

        } else if (
            error.code === "auth/invalid-email"
        ) {
            loginMessage.textContent =
                "Please enter a valid email address.";

        } else if (
            error.code === "auth/too-many-requests"
        ) {
            loginMessage.textContent =
                "Too many attempts. Please try again later.";

        } else {
            loginMessage.textContent =
                "Login failed. Please try again.";
        }
    }
});
