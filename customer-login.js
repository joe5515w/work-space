import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =============================
// Firebase
// =============================

const firebaseConfig = {

    apiKey:
        "AIzaSyAMpEEVR04IamKNSU6e_NF1mfOKri-5Yrw",

    authDomain:
        "work-space-aed69.firebaseapp.com",

    projectId:
        "work-space-aed69",

    storageBucket:
        "work-space-aed69.firebasestorage.app",

    messagingSenderId:
        "134615324990",

    appId:
        "1:134615324990:web:346d91563e063f35ffb46f",

    measurementId:
        "G-3P8QL2R5KN"

};


// =============================
// Initialize Firebase
// =============================

const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);


// =============================
// Elements
// =============================

const loginForm =
    document.getElementById(
        "customerLoginForm"
    );


const loginMessage =
    document.getElementById(
        "customerLoginMessage"
    );


// =============================
// Login
// =============================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // =============================
        // Get Form Data
        // =============================

        const email =
            document.getElementById(
                "customerEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "customerPassword"
            ).value;


        loginMessage.textContent =
            "Logging in...";


        try {

            // =============================
            // Login with Firebase
            // =============================

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            loginMessage.textContent =
                "Login successful!";


            // =============================
            // Get Current User Data
            // =============================

            const userRef =
                doc(
                    db,
                    "users",
                    user.uid
                );


            const userSnapshot =
                await getDoc(
                    userRef
                );


            // =============================
            // Check Booking Redirect
            // =============================

            const redirect =
                sessionStorage.getItem(
                    "bookingRedirect"
                );


            // =============================
            // If Came From Booking
            // =============================

            if (redirect) {

                sessionStorage.removeItem(
                    "bookingRedirect"
                );


                window.location.href =
                    redirect;


                return;
            }


        // =============================
// Check Admin / Moderator Role
// =============================

if (
    userSnapshot.exists() &&
    (
        userSnapshot.data().role === "admin" ||
        userSnapshot.data().role === "moderator"
    )
) {

    // =============================
    // ADMIN / MODERATOR
    // =============================

    window.location.href =
        "admin.html";


    return;
}

            // =============================
            // NORMAL CUSTOMER
            // =============================

            window.location.href =
                "account.html";


        } catch (error) {

            console.error(
                "Customer Login Error:",
                error
            );


            // =============================
            // Error Messages
            // =============================

            if (
                error.code ===
                "auth/invalid-credential"
            ) {

                loginMessage.textContent =
                    "Invalid email or password.";

            }


            else if (
                error.code ===
                "auth/user-not-found"
            ) {

                loginMessage.textContent =
                    "No account found with this email.";

            }


            else if (
                error.code ===
                "auth/wrong-password"
            ) {

                loginMessage.textContent =
                    "Incorrect password.";

            }


            else {

                loginMessage.textContent =
                    "Login failed. Please try again.";

            }

        }

    }
);