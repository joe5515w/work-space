import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from
    "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =========================
// Firebase
// =========================

const firebaseConfig = {
    apiKey: "AIzaSyAMpEEVR04IamKNSU6e_NF1mfOKri-5Yrw",
    authDomain: "work-space-aed69.firebaseapp.com",
    projectId: "work-space-aed69",
    storageBucket: "work-space-aed69.firebasestorage.app",
    messagingSenderId: "134615324990",
    appId: "1:134615324990:web:346d91563e063f35ffb46f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// =========================
// Get Room ID
// =========================

const params = new URLSearchParams(
    window.location.search
);

const roomId = params.get("id");


// =========================
// HTML Elements
// =========================

const roomName =
    document.getElementById("roomName");

const roomDescription =
    document.getElementById("roomDescription");

const roomCapacity =
    document.getElementById("roomCapacity");

const roomPrice =
    document.getElementById("roomPrice");

const roomFrom =
    document.getElementById("roomFrom");

const roomTo =
    document.getElementById("roomTo");

const roomFeatures =
    document.getElementById("roomFeatures");

const roomImage =
    document.getElementById("roomImage");

const galleryThumbnails =
    document.getElementById("galleryThumbnails");

const mainMedia =
    document.getElementById("mainMedia");

const bookBtn =
    document.getElementById("bookBtn");


// =========================
// Load Room
// =========================

async function loadRoom() {

    if (!roomId) {

        showError("Room ID not found.");

        return;
    }


    try {

        // =========================
        // Get rooms from Firestore
        // =========================

        const snapshot =
            await getDocs(
                collection(db, "rooms")
            );


        let room = null;


        snapshot.forEach(function (doc) {

            const data = doc.data();


            if (
                String(data.id) ===
                String(roomId)
            ) {

                room = {
                    firestoreId: doc.id,
                    ...data
                };

            }

        });


        // =========================
        // Firestore room found
        // =========================

        if (room) {

            console.log(
                "Room loaded from Firestore:",
                room
            );

            displayRoom(room);

            return;
        }


        // =========================
        // Fallback to room.js
        // =========================

        console.log(
            "Room not found in Firestore. Using room.js"
        );


        const localRoom =
            rooms.find(function (item) {

                return (
                    String(item.id) ===
                    String(roomId)
                );

            });


        if (localRoom) {

            displayRoom(localRoom);

            return;
        }


        // =========================
        // Room doesn't exist
        // =========================

        showError("Room not found.");


    } catch (error) {

        console.error(
            "Error loading room:",
            error
        );


        // =========================
        // Firebase failed
        // Use room.js
        // =========================

        console.log(
            "Using room.js fallback..."
        );


        const localRoom =
            rooms.find(function (item) {

                return (
                    String(item.id) ===
                    String(roomId)
                );

            });


        if (localRoom) {

            displayRoom(localRoom);

        } else {

            showError("Room not found.");

        }

    }

}


// =========================
// Display Room
// =========================

function displayRoom(room) {


    // =========================
    // Basic Information
    // =========================

    roomName.textContent =
        room.name || "Meeting Room";


    roomDescription.textContent =
        room.description || "";


    roomCapacity.textContent =
        room.capacity || 0;


    roomPrice.textContent =
        room.price || 0;


    roomFrom.textContent =
        room.availableFrom || "-";


    roomTo.textContent =
        room.availableTo || "-";


    // =========================
    // Book Button
    // =========================

    bookBtn.href =
        `booking.html?id=${encodeURIComponent(room.id)}`;


    // =========================
    // Features
    // =========================

    roomFeatures.innerHTML = "";


    if (
        Array.isArray(room.features) &&
        room.features.length > 0
    ) {

        room.features.forEach(function (feature) {

            const li =
                document.createElement("li");

            li.textContent =
                "✓ " + feature;

            roomFeatures.appendChild(li);

        });

    } else {

        roomFeatures.innerHTML =
            "<li>No features available.</li>";

    }


    // =========================
    // Gallery
    // =========================

    galleryThumbnails.innerHTML = "";


    let gallery = [];


    if (
        Array.isArray(room.gallery) &&
        room.gallery.length > 0
    ) {

        gallery = [...room.gallery];

    } else if (room.image) {

        gallery = [room.image];

    }


    // Remove empty images
    gallery =
        gallery.filter(function (image) {

            return image &&
                   String(image).trim() !== "";

        });


    // =========================
    // Main Image
    // =========================

    if (gallery.length > 0) {

        showImage(gallery[0]);

    } else {

        roomImage.style.display = "none";

    }


    // =========================
    // Image Thumbnails
    // =========================

    gallery.forEach(function (image, index) {

        const button =
            document.createElement("button");

        button.className =
            "gallery-thumb";


        if (index === 0) {

            button.classList.add("active");

        }


        const img =
            document.createElement("img");

        img.src = image;

        img.alt =
            room.name || "Room";


        button.appendChild(img);


        button.addEventListener(
            "click",
            function () {

                showImage(image);

                setActiveThumbnail(button);

            }
        );


        galleryThumbnails.appendChild(button);

    });


    // =========================
    // Video
    // =========================

    if (room.video) {

        const videoButton =
            document.createElement("button");

        videoButton.className =
            "gallery-thumb video-thumb";


        const videoImage =
            document.createElement("img");


        if (room.image) {

            videoImage.src =
                room.image;

        } else if (gallery.length > 0) {

            videoImage.src =
                gallery[0];

        }


        videoImage.alt =
            "Room Video";


        videoButton.appendChild(videoImage);


        videoButton.addEventListener(
            "click",
            function () {

                showVideo(room.video);

                setActiveThumbnail(videoButton);

            }
        );


        galleryThumbnails.appendChild(
            videoButton
        );

    }

}


// =========================
// Show Image
// =========================

function showImage(image) {

    mainMedia.innerHTML = "";


    const img =
        document.createElement("img");


    img.id = "roomImage";

    img.src = image;

    img.alt = "Room";


    mainMedia.appendChild(img);

}


// =========================
// Show Video
// =========================

function showVideo(video) {

    mainMedia.innerHTML = "";


    const videoElement =
        document.createElement("video");


    videoElement.controls = true;

    videoElement.autoplay = true;

    videoElement.playsInline = true;

    videoElement.src = video;


    mainMedia.appendChild(
        videoElement
    );

}


// =========================
// Active Thumbnail
// =========================

function setActiveThumbnail(button) {

    const buttons =
        galleryThumbnails.querySelectorAll(
            ".gallery-thumb"
        );


    buttons.forEach(function (item) {

        item.classList.remove("active");

    });


    button.classList.add("active");

}


// =========================
// Error
// =========================

function showError(message) {

    roomName.textContent =
        "Room Not Found";

    roomDescription.textContent =
        message;

    roomCapacity.textContent =
        "-";

    roomPrice.textContent =
        "-";

    roomFrom.textContent =
        "-";

    roomTo.textContent =
        "-";

    roomFeatures.innerHTML = "";

    galleryThumbnails.innerHTML = "";

    mainMedia.innerHTML = "";

    bookBtn.style.display = "none";

}


// =========================
// Start
// =========================

loadRoom();