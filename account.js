import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    collection,
    query,
    where,
    onSnapshot
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
// Notification Sound
// =============================

const notificationSound =
    new Audio("notification/mixkit-happy-bells-notification-937.wav");

notificationSound.volume = 0.7;


// =============================
// Elements
// =============================

const customerName =
    document.getElementById("customerName");

const customerEmail =
    document.getElementById("customerEmail");

const bookingsList =
    document.getElementById("bookingsList");

const bookingCount =
    document.getElementById("bookingCount");

const logoutBtn =
    document.getElementById("logoutBtn");


// =============================
// Previous Bookings
// =============================

const previousBookings =
    new Map();


// =============================
// Notification Function
// =============================

function showNotification(message, type) {

    const notification =
        document.createElement("div");


    notification.className =
        "customer-notification";


    notification.innerHTML = `

        <div class="notification-icon">
            ${type === "confirmed" ? "✅" :
              type === "cancelled" ? "❌" :
              "🔔"}
        </div>

        <div class="notification-content">

            <strong>
                Work-Space
            </strong>

            <p>
                ${message}
            </p>

        </div>

        <button class="notification-close">
            ×
        </button>

    `;


    document.body.appendChild(
        notification
    );


    // =============================
    // Play Sound
    // =============================

    notificationSound.currentTime = 0;


    notificationSound.play().catch(
        function (error) {

            console.log(
                "Sound could not play:",
                error
            );

        }
    );


    // =============================
    // Close Button
    // =============================

    const closeBtn =
        notification.querySelector(
            ".notification-close"
        );


    closeBtn.addEventListener(
        "click",
        function () {

            notification.remove();

        }
    );


    // =============================
    // Auto Remove
    // =============================

    setTimeout(
        function () {

            if (
                notification &&
                notification.parentElement
            ) {

                notification.remove();

            }

        },
        6000
    );

}


// =============================
// Auth State
// =============================

onAuthStateChanged(
    auth,
    async function (user) {

        if (!user) {

            window.location.href =
                "customer-login.html";

            return;

        }


        try {

            // =============================
            // Get Customer Data
            // =============================

            const userRef =
                doc(
                    db,
                    "users",
                    user.uid
                );


            const userSnapshot =
                await getDoc(userRef);


            if (userSnapshot.exists()) {

                const userData =
                    userSnapshot.data();


                customerName.textContent =
                    userData.name ||
                    "Customer";


                customerEmail.textContent =
                    userData.email ||
                    user.email;

            } else {

                customerName.textContent =
                    "Customer";

                customerEmail.textContent =
                    user.email;

            }


            // =============================
            // Start Booking Listener
            // =============================

            watchBookings(
                user.uid
            );


        } catch (error) {

            console.error(
                "Account Error:",
                error
            );

        }

    }
);


// =============================
// Watch Customer Bookings
// =============================

function watchBookings(userId) {

    const bookingsRef =
        collection(
            db,
            "bookings"
        );


    const q =
        query(
            bookingsRef,

            where(
                "userId",
                "==",
                userId
            )
        );


    let firstSnapshot =
        true;


    onSnapshot(
        q,

        function (snapshot) {

            // =============================
            // Booking Count
            // =============================

            bookingCount.textContent =
                `${snapshot.size} Booking${snapshot.size !== 1 ? "s" : ""}`;


            // =============================
            // Empty Bookings
            // =============================

            if (snapshot.empty) {

                bookingsList.innerHTML = `

                    <div class="empty-bookings">

                        <h3>
                            No bookings yet
                        </h3>

                        <p>
                            You don't have any bookings yet.
                        </p>

                    </div>

                `;


                firstSnapshot = false;

                return;

            }


            // =============================
            // Check Changes
            // =============================

            if (!firstSnapshot) {

                snapshot.docChanges().forEach(
                    function (change) {

                        const bookingId =
                            change.doc.id;


                        const newBooking =
                            change.doc.data();


                        // =============================
                        // Added Booking
                        // =============================

                        if (
                            change.type === "added"
                        ) {

                            // If it wasn't previously
                            // stored, don't notify
                            // unless you want to notify
                            // about new bookings.

                            if (
                                !previousBookings.has(
                                    bookingId
                                )
                            ) {

                                return;

                            }

                        }


                        // =============================
                        // Modified Booking
                        // =============================

                        if (
                            change.type === "modified"
                        ) {

                            const oldBooking =
                                previousBookings.get(
                                    bookingId
                                );


                            if (!oldBooking) {

                                return;

                            }


                            const oldStatus =
                                oldBooking.status ||
                                "pending";


                            const newStatus =
                                newBooking.status ||
                                "pending";


                            // =============================
                            // Confirmed
                            // =============================

                            if (
                                oldStatus !== "confirmed" &&
                                newStatus === "confirmed"
                            ) {

                                showNotification(

                                    `Your booking for ${newBooking.room || "the room"} has been confirmed.`,

                                    "confirmed"

                                );

                            }


                            // =============================
                            // Cancelled
                            // =============================

                            else if (
                                oldStatus !== "cancelled" &&
                                newStatus === "cancelled"
                            ) {

                                showNotification(

                                    `Your booking for ${newBooking.room || "the room"} has been cancelled.`,

                                    "cancelled"

                                );

                            }


                            // =============================
                            // Other Modification
                            // =============================

                            else if (
                                oldStatus === newStatus
                            ) {

                                const importantFieldsChanged =

                                    oldBooking.room !== newBooking.room ||

                                    oldBooking.date !== newBooking.date ||

                                    oldBooking.from !== newBooking.from ||

                                    oldBooking.to !== newBooking.to ||

                                    oldBooking.people !== newBooking.people ||

                                    oldBooking.total !== newBooking.total;


                                if (
                                    importantFieldsChanged
                                ) {

                                    showNotification(

                                        `Your booking for ${newBooking.room || "the room"} has been updated.`,

                                        "updated"

                                    );

                                }

                            }

                        }

                    }
                );

            }


            // =============================
            // Save Current Bookings
            // =============================

            snapshot.forEach(
                function (docSnapshot) {

                    previousBookings.set(
                        docSnapshot.id,
                        docSnapshot.data()
                    );

                }
            );


            // =============================
            // Display Bookings
            // =============================

            bookingsList.innerHTML = "";


            snapshot.forEach(
                function (docSnapshot) {

                    const booking =
                        docSnapshot.data();


                    const status =
                        booking.status ||
                        "pending";


                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "booking-card";


                    card.innerHTML = `

                        <div class="booking-top">

                            <div>

                                <h3>
                                    ${booking.room || "-"}
                                </h3>

                                <span class="booking-id">
                                    ${booking.bookingId || "-"}
                                </span>

                            </div>


                            <span class="status ${status}">
                                ${status}
                            </span>

                        </div>


                        <div class="booking-details">

                            <div>

                                <span>
                                    Date
                                </span>

                                <strong>
                                    ${booking.date || "-"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Time
                                </span>

                                <strong>
                                    ${booking.from || "-"}
                                    →
                                    ${booking.to || "-"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    People
                                </span>

                                <strong>
                                    ${booking.people || "-"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ${booking.total || 0} EGP
                                </strong>

                            </div>

                        </div>

                    `;


                    bookingsList.appendChild(
                        card
                    );

                }
            );


            // =============================
            // First Snapshot Finished
            // =============================

            firstSnapshot =
                false;

        },

        function (error) {

            console.error(
                "Bookings Listener Error:",
                error
            );

        }
    );

}


// =============================
// Logout
// =============================

logoutBtn.addEventListener(
    "click",
    async function () {

        try {

            await signOut(auth);


            window.location.href =
                "customer-login.html";


        } catch (error) {

            console.error(
                "Logout Error:",
                error
            );

        }

    }
);

