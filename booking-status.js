import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getFirestore,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =============================
// Firebase Configuration
// =============================

const firebaseConfig = {

    apiKey: "",

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


// =============================
// Initialize Firebase
// =============================

const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


// =============================
// Elements
// =============================

const statusForm =
    document.getElementById("statusForm");

const bookingIdInput =
    document.getElementById("bookingId");

const statusResult =
    document.getElementById("statusResult");

const resultRoom =
    document.getElementById("resultRoom");

const resultName =
    document.getElementById("resultName");

const resultDate =
    document.getElementById("resultDate");

const resultTime =
    document.getElementById("resultTime");

const resultStatus =
    document.getElementById("resultStatus");


// =============================
// Check Booking
// =============================

statusForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const bookingId =
            bookingIdInput.value
                .trim();


        if (!bookingId) {

            return;

        }


        try {

            // =============================
            // Search Booking
            // =============================

            const bookingsRef =
                collection(
                    db,
                    "bookings"
                );


            const q =
                query(
                    bookingsRef,

                    where(
                        "bookingId",
                        "==",
                        bookingId
                    )
                );


            const snapshot =
                await getDocs(q);


            // =============================
            // Booking Not Found
            // =============================

            if (snapshot.empty) {

                alert(
                    "Booking not found."
                );

                statusResult.classList.remove(
                    "show"
                );

                return;

            }


            // =============================
            // Get Booking
            // =============================

            const booking =
                snapshot.docs[0].data();


            // =============================
            // Display Data
            // =============================

            resultName.textContent =
            booking.name || "-";

            resultRoom.textContent =
                booking.room || "-";


            resultDate.textContent =
                booking.date || "-";


            resultTime.textContent =
                `${booking.from || "-"} - ${booking.to || "-"}`;


            resultStatus.textContent =
                booking.status || "pending";


            // =============================
            // Show Result
            // =============================

            statusResult.classList.add(
                "show"
            );


        } catch (error) {

            console.error(
                "Status Error:",
                error
            );


            alert(
                "Something went wrong. Please try again."
            );

        }

    }
);