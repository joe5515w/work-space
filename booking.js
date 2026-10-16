import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    doc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// =====================================================
// Firebase Configuration
// =====================================================

const firebaseConfig = {
    apiKey: "AIzaSyAMpEEVR04IamKNSU6e_NF1mfOKri-5Yrw",
    authDomain: "work-space-aed69.firebaseapp.com",
    projectId: "work-space-aed69",
    storageBucket: "work-space-aed69.firebasestorage.app",
    messagingSenderId: "134615324990",
    appId: "1:134615324990:web:346d91563e063f35ffb46f"
};


// =====================================================
// Initialize Firebase
// =====================================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);


// =====================================================
// Current User
// =====================================================

let currentUser = null;


// =====================================================
// Current Room
// =====================================================

let room = null;


// =====================================================
// Get Room ID From URL
// Example:
// booking.html?id=2
// =====================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const roomId =
    Number(
        urlParams.get("id")
    );


// =====================================================
// Load Customer Data
// =====================================================

async function loadCustomerData(user) {

    const nameInput =
        document.getElementById("name");

    const emailInput =
        document.getElementById("email");


    // -------------------------------------------------
    // Email from Firebase Authentication
    // -------------------------------------------------

    if (emailInput) {

        emailInput.value =
            user.email || "";

        emailInput.readOnly = true;

    }


    // -------------------------------------------------
    // Load customer name from Firestore
    // -------------------------------------------------

    try {

        const userRef =
            doc(
                db,
                "users",
                user.uid
            );


        const userSnapshot =
            await getDoc(userRef);


        if (!userSnapshot.exists()) {

            console.log(
                "Customer profile not found."
            );

            return;

        }


        const userData =
            userSnapshot.data();


        if (nameInput) {

            nameInput.value =
                userData.name || "";

        }


    } catch (error) {

        console.error(
            "Customer Data Error:",
            error
        );

    }

}


// =====================================================
// Authentication State
// =====================================================

onAuthStateChanged(
    auth,
    async function (user) {

        if (!user) {

            alert(
                "Please login to book a room."
            );


            window.location.href =
                "customer-login.html";


            return;

        }


        currentUser = user;


        await loadCustomerData(user);

    }
);


// =====================================================
// Load Room From Firestore
// =====================================================

async function loadRoom() {

    if (!roomId) {

        alert(
            "Room ID not found."
        );

        return;

    }


    try {

        // -------------------------------------------------
        // Get all rooms from Firestore
        // -------------------------------------------------

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "rooms"
                )
            );


        let firebaseRoom = null;


        snapshot.forEach(
            function (roomDoc) {

                const data =
                    roomDoc.data();


                if (
                    String(data.id) ===
                    String(roomId)
                ) {

                    firebaseRoom = {

                        firestoreId:
                            roomDoc.id,

                        ...data

                    };

                }

            }
        );


        // -------------------------------------------------
        // Firestore room found
        // -------------------------------------------------

        if (firebaseRoom) {

            room = firebaseRoom;


            console.log(
                "Room loaded from Firestore:",
                room
            );


            setupRoom();


            return;

        }


        // -------------------------------------------------
        // Fallback to room.js
        // -------------------------------------------------

        console.log(
            "Room not found in Firestore. Using room.js"
        );


        if (
            typeof rooms !== "undefined"
        ) {

            const localRoom =
                rooms.find(
                    function (item) {

                        return (
                            Number(item.id) ===
                            roomId
                        );

                    }
                );


            if (localRoom) {

                room = localRoom;


                console.log(
                    "Room loaded from room.js:",
                    room
                );


                setupRoom();


                return;

            }

        }


        // -------------------------------------------------
        // Room not found
        // -------------------------------------------------

        alert(
            "Room not found."
        );


    } catch (error) {

        console.error(
            "Load Room Error:",
            error
        );


        // -------------------------------------------------
        // Firebase error → room.js fallback
        // -------------------------------------------------

        if (
            typeof rooms !== "undefined"
        ) {

            const localRoom =
                rooms.find(
                    function (item) {

                        return (
                            Number(item.id) ===
                            roomId
                        );

                    }
                );


            if (localRoom) {

                room = localRoom;


                console.log(
                    "Using room.js fallback:",
                    room
                );


                setupRoom();


                return;

            }

        }


        alert(
            "Unable to load room."
        );

    }

}


// =====================================================
// Setup Room
// =====================================================

function setupRoom() {

    const roomInput =
        document.getElementById("room");


    if (roomInput) {

        roomInput.value =
            room.name || "";

    }


    // -------------------------------------------------
    // Set minimum date
    // -------------------------------------------------

    const dateInput =
        document.getElementById("date");


    if (dateInput) {

        const today =
            new Date();


        const todayString =
            today
                .toISOString()
                .split("T")[0];


        dateInput.min =
            todayString;

    }


    console.log(
        "Current Room:",
        room
    );

}


// =====================================================
// Form Elements
// =====================================================

const dateInput =
    document.getElementById("date");

const fromInput =
    document.getElementById("from");

const toInput =
    document.getElementById("to");

const totalPrice =
    document.getElementById("totalPrice");

const roomInput =
    document.getElementById("room");

const totalInput =
    document.getElementById("totalInput");

const fromFormatted =
    document.getElementById("fromFormatted");

const toFormatted =
    document.getElementById("toFormatted");

const bookingForm =
    document.getElementById("bookingForm");


// =====================================================
// Availability Elements
// =====================================================

const availabilityList =
    document.getElementById(
        "availabilityList"
    );

const availabilityMessage =
    document.getElementById(
        "availabilityMessage"
    );


// =====================================================
// Booking Success Elements
// =====================================================

const bookingSuccess =
    document.getElementById(
        "bookingSuccess"
    );

const bookingIdDisplay =
    document.getElementById(
        "bookingIdDisplay"
    );

const copyBookingId =
    document.getElementById(
        "copyBookingId"
    );

const copyMessage =
    document.getElementById(
        "copyMessage"
    );


// =====================================================
// Format Time
// =====================================================

function formatTime(time) {

    const [hour, minute] =
        time.split(":");


    let h =
        Number(hour);


    const ampm =
        h >= 12
            ? "PM"
            : "AM";


    h =
        h % 12;


    if (h === 0) {

        h = 12;

    }


    return `${h}:${minute} ${ampm}`;

}


// =====================================================
// Convert AM/PM To Minutes
// "2:00 PM" → 840
// =====================================================

function timeToMinutes(time) {

    if (!time) {

        return 0;

    }


    const [timePart, period] =
        time.split(" ");


    let [hour, minute] =
        timePart
            .split(":")
            .map(Number);


    if (
        period === "PM" &&
        hour !== 12
    ) {

        hour += 12;

    }


    if (
        period === "AM" &&
        hour === 12
    ) {

        hour = 0;

    }


    return (
        hour * 60 +
        minute
    );

}


// =====================================================
// Convert Minutes To AM/PM
// =====================================================

function minutesToTime(minutes) {

    let hour =
        Math.floor(
            minutes / 60
        );


    const minute =
        minutes % 60;


    const period =
        hour >= 12
            ? "PM"
            : "AM";


    if (hour > 12) {

        hour -= 12;

    }


    if (hour === 0) {

        hour = 12;

    }


    return (
        String(hour).padStart(2, "0") +
        ":" +
        String(minute).padStart(2, "0") +
        " " +
        period
    );

}


// =====================================================
// Calculate Booking Price
// =====================================================

function calculatePrice() {

    if (!room) {

        return;

    }


    const from =
        fromInput.value;

    const to =
        toInput.value;


    if (
        !from ||
        !to
    ) {

        totalPrice.textContent =
            "0";

        totalInput.value =
            "0";

        return;

    }


    const fromTime =
        new Date(
            `1970-01-01T${from}`
        );


    const toTime =
        new Date(
            `1970-01-01T${to}`
        );


    const milliseconds =
        toTime.getTime() -
        fromTime.getTime();


    const hours =
        milliseconds /
        (1000 * 60 * 60);


    if (hours <= 0) {

        totalPrice.textContent =
            "0";

        totalInput.value =
            "0";

        return;

    }


    // IMPORTANT
    // Price now comes from Firestore room

    const total =
        hours *
        Number(room.price || 0);


    totalPrice.textContent =
        total.toFixed(2);


    totalInput.value =
        total.toFixed(2);


    fromFormatted.value =
        formatTime(from);


    toFormatted.value =
        formatTime(to);

}


// =====================================================
// Time Change Events
// =====================================================

fromInput.addEventListener(
    "change",
    calculatePrice
);

toInput.addEventListener(
    "change",
    calculatePrice
);


// =====================================================
// Load Room Availability
// =====================================================

async function loadAvailability() {

    if (!room) {

        return;

    }


    const selectedDate =
        dateInput.value;


    if (!selectedDate) {

        availabilityMessage.textContent =
            "Select a date to see available times.";


        availabilityList.innerHTML =
            "";


        return;

    }


    availabilityMessage.textContent =
        "Checking availability...";


    availabilityList.innerHTML =
        "";


    try {

        const roomStart =
            timeToMinutes(
                room.availableFrom
            );


        const roomEnd =
            timeToMinutes(
                room.availableTo
            );


        const bookingsRef =
            collection(
                db,
                "bookings"
            );


        const q =
            query(
                bookingsRef,

                where(
                    "roomId",
                    "==",
                    room.id
                ),

                where(
                    "date",
                    "==",
                    selectedDate
                )
            );


        const snapshot =
            await getDocs(q);


        const bookings = [];


        snapshot.forEach(
            function (docSnapshot) {

                const booking =
                    docSnapshot.data();


                if (
                    booking.status ===
                    "cancelled"
                ) {

                    return;

                }


                if (
                    !booking.from ||
                    !booking.to
                ) {

                    return;

                }


                bookings.push({

                    start:
                        timeToMinutes(
                            booking.from
                        ),

                    end:
                        timeToMinutes(
                            booking.to
                        )

                });

            }
        );


        bookings.sort(
            function (a, b) {

                return (
                    a.start -
                    b.start
                );

            }
        );


        const periods = [];


        let currentTime =
            roomStart;


        bookings.forEach(
            function (booking) {

                if (
                    booking.end <=
                    roomStart
                ) {

                    return;

                }


                if (
                    booking.start >=
                    roomEnd
                ) {

                    return;

                }


                const bookingStart =
                    Math.max(
                        booking.start,
                        roomStart
                    );


                const bookingEnd =
                    Math.min(
                        booking.end,
                        roomEnd
                    );


                if (
                    currentTime <
                    bookingStart
                ) {

                    periods.push({

                        type:
                            "available",

                        start:
                            currentTime,

                        end:
                            bookingStart

                    });

                }


                if (
                    bookingEnd >
                    currentTime
                ) {

                    periods.push({

                        type:
                            "booked",

                        start:
                            bookingStart,

                        end:
                            bookingEnd

                    });


                    currentTime =
                        Math.max(
                            currentTime,
                            bookingEnd
                        );

                }

            }
        );


        if (
            currentTime <
            roomEnd
        ) {

            periods.push({

                type:
                    "available",

                start:
                    currentTime,

                end:
                    roomEnd

            });

        }


        if (
            periods.length === 0
        ) {

            periods.push({

                type:
                    "available",

                start:
                    roomStart,

                end:
                    roomEnd

            });

        }


        availabilityMessage.textContent =
            "Room availability for " +
            selectedDate;


        periods.forEach(
            function (period) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "availability-item " +
                    period.type;


                const label =
                    period.type === "booked"
                        ? "🔴 Booked"
                        : "🟢 Available";


                item.innerHTML = `

                    <span>
                        ${label}
                    </span>

                    <strong>
                        ${minutesToTime(
                            period.start
                        )}
                        →
                        ${minutesToTime(
                            period.end
                        )}
                    </strong>

                `;


                availabilityList.appendChild(
                    item
                );

            }
        );


    } catch (error) {

        console.error(
            "Availability Error:",
            error
        );


        availabilityMessage.textContent =
            "Unable to load availability.";


        availabilityList.innerHTML =
            "";

    }

}


// =====================================================
// Date Change
// =====================================================

dateInput.addEventListener(
    "change",
    loadAvailability
);


// =====================================================
// Copy Booking ID
// =====================================================

copyBookingId.addEventListener(
    "click",
    async function () {

        try {

            await navigator.clipboard.writeText(
                bookingIdDisplay.textContent
            );


            copyMessage.textContent =
                "Booking ID copied!";


        } catch (error) {

            copyMessage.textContent =
                "Copy failed. Please copy it manually.";

        }

    }
);


// =====================================================
// Submit Booking
// =====================================================

bookingForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // -------------------------------------------------
        // Make sure user is logged in
        // -------------------------------------------------

        if (!currentUser) {

            alert(
                "Please login to your account before booking."
            );


            window.location.href =
                "customer-login.html";


            return;

        }


        // -------------------------------------------------
        // Make sure room is loaded
        // -------------------------------------------------

        if (!room) {

            alert(
                "Room information is not available."
            );


            return;

        }


        calculatePrice();


        const date =
            dateInput.value;


        const from =
            fromInput.value;


        const to =
            toInput.value;


        // -------------------------------------------------
        // Validate Date
        // -------------------------------------------------

        if (!date) {

            alert(
                "Please select a date."
            );


            return;

        }


        // -------------------------------------------------
        // Validate Time
        // -------------------------------------------------

        if (
            !from ||
            !to
        ) {

            alert(
                "Please select From and To time."
            );


            return;

        }


        const [fromHour, fromMinute] =
            from
                .split(":")
                .map(Number);


        const [toHour, toMinute] =
            to
                .split(":")
                .map(Number);


        const fromTotal =
            fromHour * 60 +
            fromMinute;


        const toTotal =
            toHour * 60 +
            toMinute;


        // -------------------------------------------------
        // Check Time Order
        // -------------------------------------------------

        if (
            toTotal <=
            fromTotal
        ) {

            alert(
                "The end time must be after the start time."
            );


            return;

        }


        // -------------------------------------------------
        // Check Room Working Hours
        // -------------------------------------------------

        const roomStart =
            timeToMinutes(
                room.availableFrom
            );


        const roomEnd =
            timeToMinutes(
                room.availableTo
            );


        if (
            fromTotal <
            roomStart ||
            toTotal >
            roomEnd
        ) {

            alert(
                `This room is available from ${room.availableFrom} to ${room.availableTo}.`
            );


            return;

        }


        // -------------------------------------------------
        // Generate Booking ID
        // -------------------------------------------------

        const bookingId =
            "WS-" +
            Date.now();


        // -------------------------------------------------
        // Create Booking Object
        // -------------------------------------------------

        const booking = {

            bookingId:
                bookingId,


            userId:
                currentUser.uid,


            room:
                room.name,


            roomId:
                room.id,


            date:
                date,


            from:
                fromFormatted.value,


            to:
                toFormatted.value,


            name:
                document.getElementById(
                    "name"
                ).value,


            phone:
                document.getElementById(
                    "phone"
                ).value,


            email:
                currentUser.email,


            people:
                Number(
                    document.getElementById(
                        "people"
                    ).value
                ),


            notes:
                document.getElementById(
                    "notes"
                ).value,


            total:
                Number(
                    totalInput.value
                ),


            status:
                "pending",


            createdAt:
                new Date()

        };


        try {

            // =================================================
            // Check Existing Bookings
            // =================================================

            const bookingsRef =
                collection(
                    db,
                    "bookings"
                );


            const q =
                query(
                    bookingsRef,

                    where(
                        "roomId",
                        "==",
                        room.id
                    ),

                    where(
                        "date",
                        "==",
                        booking.date
                    )
                );


            const snapshot =
                await getDocs(q);


            const newFrom =
                timeToMinutes(
                    booking.from
                );


            const newTo =
                timeToMinutes(
                    booking.to
                );


            let hasConflict =
                false;


            snapshot.forEach(
                function (docSnapshot) {

                    const existingBooking =
                        docSnapshot.data();


                    if (
                        existingBooking.status ===
                        "cancelled"
                    ) {

                        return;

                    }


                    if (
                        !existingBooking.from ||
                        !existingBooking.to
                    ) {

                        return;

                    }


                    const existingFrom =
                        timeToMinutes(
                            existingBooking.from
                        );


                    const existingTo =
                        timeToMinutes(
                            existingBooking.to
                        );


                    if (
                        newFrom <
                        existingTo &&
                        newTo >
                        existingFrom
                    ) {

                        hasConflict =
                            true;

                    }

                }
            );


            // =================================================
            // Booking Conflict
            // =================================================

            if (
                hasConflict
            ) {

                alert(
                    "This time is already booked.\n\n" +
                    "Please choose another time."
                );


                await loadAvailability();


                return;

            }


            // =================================================
            // Save Booking
            // =================================================

            const bookingRef =
                await addDoc(
                    collection(
                        db,
                        "bookings"
                    ),
                    booking
                );


            // =================================================
            // Create Admin Notification
            // =================================================

            await addDoc(
                collection(
                    db,
                    "notifications"
                ),
                {

                    name:
                        booking.name,

                    room:
                        booking.room,

                    bookingId:
                        bookingRef.id,

                    type:
                        "new_booking",

                    read:
                        false,

                    createdAt:
                        serverTimestamp()

                }
            );


            // =================================================
            // Show Success Message
            // =================================================

            bookingIdDisplay.textContent =
                bookingId;


            bookingSuccess.classList.add(
                "show"
            );


            // Reset form
            bookingForm.reset();


            // Reset total
            totalPrice.textContent =
                "0";


            totalInput.value =
                "0";


            // Clear availability
            availabilityList.innerHTML =
                "";


            availabilityMessage.textContent =
                "Select a date to see available times.";


            // Restore account email
            if (currentUser) {

                const emailInput =
                    document.getElementById(
                        "email"
                    );


                if (emailInput) {

                    emailInput.value =
                        currentUser.email || "";


                    emailInput.readOnly =
                        true;

                }

            }


        } catch (error) {

            console.error(
                "Booking Error:",
                error
            );


            alert(
                "Error: " +
                error.message
            );

        }

    }
);


// =====================================================
// Start Loading Room
// =====================================================

loadRoom();