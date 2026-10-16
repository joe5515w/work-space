import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// =============================
// Firebase
// =============================

const firebaseConfig = {

    apiKey: "AIzaSyAMpEEVR04IamKNSU6e_NF1mfOKri-5Yrw",

    authDomain: "work-space-aed69.firebaseapp.com",

    projectId: "work-space-aed69",

    storageBucket: "work-space-aed69.firebasestorage.app",

    messagingSenderId: "134615324990",

    appId: "1:134615324990:web:346d91563e063f35ffb46f"

};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// =============================
// Elements
// =============================

const loginForm =
    document.getElementById("loginForm");

const errorMessage =
    document.getElementById("errorMessage");


// =============================
// Login
// =============================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        errorMessage.textContent = "";


        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            // Login successful

            window.location.href =
                "admin.html";


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            errorMessage.textContent =
                "Invalid email or password.";

        }

    }
);