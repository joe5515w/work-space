import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =============================
// Firebase
// =============================

const firebaseConfig = {

    apiKey: "AIzaSyAMpEEVR04IamKNSU6e_NF1mfOKri-5Yrw",

    authDomain:
        "work-space-aed69.firebaseapp.com",

    projectId:
        "work-space-aed69",

    storageBucket:
        "work-space-aed69.firebasestorage.app",

    messagingSenderId:
        "134615324990",

    appId:
        "1:134615324990:web:346d91563e063f35ffb46f"

};


const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);


// =============================
// Elements
// =============================

const signupForm =
    document.getElementById(
        "signupForm"
    );


const signupMessage =
    document.getElementById(
        "signupMessage"
    );


// =============================
// Sign Up
// =============================

signupForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "signupName"
            ).value.trim();


        const email =
            document.getElementById(
                "signupEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "signupPassword"
            ).value;


        signupMessage.textContent =
            "Creating account...";


        try {

            // =============================
            // Create Firebase Account
            // =============================

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


            const user =
                userCredential.user;


            // =============================
            // Save Customer Data
            // =============================

            await setDoc(
                doc(
                    db,
                    "users",
                    user.uid
                ),
                {

                    name: name,

                    email: email,

                    role: "customer",

                    createdAt: new Date()

                }
            );


            signupMessage.textContent =
                "Account created successfully!";


            // =============================
            // Go To Account
            // =============================
setTimeout(
    function () {

        const redirect =
            sessionStorage.getItem(
                "bookingRedirect"
            );


        if (redirect) {

            sessionStorage.removeItem(
                "bookingRedirect"
            );

            window.location.href =
                redirect;

        } else {

            window.location.href =
                "index.html";

        }

    },
    1000
);

        } catch (error) {

            console.error(
                "Signup Error:",
                error
            );


            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                signupMessage.textContent =
                    "This email is already registered.";

            }

            else if (
                error.code ===
                "auth/weak-password"
            ) {

                signupMessage.textContent =
                    "Password must be at least 6 characters.";

            }

            else {

                signupMessage.textContent =
                    "Something went wrong.";

            }

        }

    }
);