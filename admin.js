import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ==================================================
// FIREBASE
// ==================================================

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

const auth = getAuth(app);


// ==================================================
// ADMIN UID
// ==================================================

const ADMIN_UID =
    "J0mfuuDh0fQXRnPx6c4kHbvycx52";


// ==================================================
// CURRENT ROOMS
// ==================================================

const currentRooms = [

    {
        id: 1,
        name: "Meeting Room 1",
        image: "img/1.webp",

        gallery: [
            "img/1.webp",
            "img/1.webp",
            "img/1-3.webp",
            "img/1-4.webp"
        ],

        video: "videos/room-1.mp4",

        capacity: 6,
        price: 250,

        availableFrom: "08:00 AM",
        availableTo: "10:00 PM",

        description:
            "A comfortable meeting room perfect for small teams and business meetings.",

        features: [
            "Wi-Fi",
            "Air Conditioning",
            "Smart Screen",
            "Whiteboard"
        ]
    },

    {
        id: 2,
        name: "Meeting Room 2",
        image: "img/2.jpg",

        gallery: [
            "img/2.jpg",
            "img/2-2.jpg",
            "img/2-3.jpg"
        ],

        video: "video/00.mp4",

        capacity: 8,
        price: 350,

        availableFrom: "09:00 AM",
        availableTo: "11:00 PM",

        description:
            "A spacious meeting room suitable for meetings and small workshops.",

        features: [
            "Wi-Fi",
            "Air Conditioning",
            "Screen",
            "Whiteboard"
        ]
    },

    {
        id: 3,
        name: "Meeting Room 3",
        image: "img/3.jpg",

        gallery: [
            "img/3.jpg",
            "img/3-2.jpg",
            "img/3-3.jpg"
        ],

        video: null,

        capacity: 10,
        price: 350,

        availableFrom: "08:00 AM",
        availableTo: "10:00 PM",

        description:
            "A large room designed for team meetings and presentations.",

        features: [
            "Wi-Fi",
            "Air Conditioning",
            "Projector",
            "Whiteboard"
        ]
    },

    {
        id: 4,
        name: "Meeting Room 4",
        image: "img/4.jpg",

        gallery: [
            "img/4.jpg",
            "img/4-2.jpg",
            "img/4-3.jpg"
        ],

        video: null,

        capacity: 4,
        price: 400,

        availableFrom: "08:00 AM",
        availableTo: "09:00 PM",

        description:
            "A private and quiet room perfect for small meetings.",

        features: [
            "Wi-Fi",
            "Air Conditioning",
            "TV"
        ]
    },

    {
        id: 5,
        name: "Meeting Room 5",
        image: "img/5.webp",

        gallery: [
            "img/5.webp",
            "img/5-2.webp",
            "img/5-3.webp"
        ],

        video: null,

        capacity: 12,
        price: 400,

        availableFrom: "09:00 AM",
        availableTo: "11:00 PM",

        description:
            "A large conference room perfect for bigger teams and workshops.",

        features: [
            "Wi-Fi",
            "Air Conditioning",
            "Projector",
            "Large Screen"
        ]
    },

    {
        id: 6,
        name: "Meeting Room 6",
        image: "img/6.jpg",

        gallery: [
            "img/6.jpg",
            "img/6-2.jpg",
            "img/6-3.jpg"
        ],

        video: null,

        capacity: 12,
        price: 600,

        availableFrom: "08:00 AM",
        availableTo: "10:00 PM",

        description:
            "A modern workspace suitable for meetings and team collaboration.",

        features: [
            "Wi-Fi",
            "Air Conditioning",
            "Smart Screen",
            "Whiteboard"
        ]
    },

    {
        id: 7,
        name: "Meeting Room 7",
        image: "img/7.webp",

        gallery: [
            "img/7.webp",
            "img/7-2.webp",
            "img/7-3.webp"
        ],

        video: null,

        capacity: 12,
        price: 600,

        availableFrom: "09:00 AM",
        availableTo: "11:00 PM",

        description:
            "A premium meeting room with everything you need for productive meetings.",

        features: [
            "Wi-Fi",
            "Air Conditioning",
            "Projector",
            "Smart Screen"
        ]
    }

];


// ==================================================
// NOTIFICATION SOUND
// ==================================================

const notificationSound =
    new Audio(
        "./notification/mixkit-happy-bells-notification-937.wav"
    );

notificationSound.volume = 0.7;


// ==================================================
// ELEMENTS
// ==================================================

const logoutBtn =
    document.getElementById("logoutBtn");

const bookingsTable =
    document.getElementById("bookingsTable");

const totalBookings =
    document.getElementById("totalBookings");

const pendingBookings =
    document.getElementById("pendingBookings");

const confirmedBookings =
    document.getElementById("confirmedBookings");

const totalRevenue =
    document.getElementById("totalRevenue");

const searchInput =
    document.getElementById("searchInput");

const statusFilter =
    document.getElementById("statusFilter");

const dashboardLink =
    document.getElementById("dashboardLink");

const bookingsLink =
    document.getElementById("bookingsLink");

const roomsLink =
    document.getElementById("roomsLink");

const newBookingsBadge =
    document.getElementById("newBookingsBadge");

const dashboardSection =
    document.getElementById("dashboardSection");

const roomsSection =
    document.getElementById("roomsSection");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");

const supportLink =
    document.getElementById("supportLink");


const supportSection =
     document.getElementById("supportSection");


// ==================================================
// ROOMS ELEMENTS
// ==================================================

const roomsGrid =
    document.getElementById("roomsGrid");

const roomsSearchInput =
    document.getElementById("roomsSearchInput");

const importRoomsBtn =
    document.getElementById("importRoomsBtn");

const roomModal =
    document.getElementById("roomModal");

const closeRoomModal =
    document.getElementById("closeRoomModal");

const cancelRoomEdit =
    document.getElementById("cancelRoomEdit");

const roomForm =
    document.getElementById("roomForm");

const editRoomId =
    document.getElementById("editRoomId");

const editRoomName =
    document.getElementById("editRoomName");

const editRoomCapacity =
    document.getElementById("editRoomCapacity");

const editRoomPrice =
    document.getElementById("editRoomPrice");

const editAvailableFrom =
    document.getElementById("editAvailableFrom");

const editAvailableTo =
    document.getElementById("editAvailableTo");

const editRoomDescription =
    document.getElementById("editRoomDescription");

const editRoomFeatures =
    document.getElementById("editRoomFeatures");

const editRoomImage =
    document.getElementById("editRoomImage");

const currentRoomImage =
    document.getElementById("currentRoomImage");

const editRoomGallery =
    document.getElementById("editRoomGallery");

const editRoomVideo =
    document.getElementById("editRoomVideo");

const saveRoomBtn =
    document.getElementById("saveRoomBtn");


    
const supportMessagesBadge =
    document.getElementById("supportMessagesBadge");

const supportConversationsList =
    document.getElementById("supportConversationsList");

const supportConversationCount =
    document.getElementById("supportConversationCount");

const supportSearch =
    document.getElementById("supportSearch");

const supportChatHeader =
    document.getElementById("supportChatHeader");

const supportCustomerName =
    document.getElementById("supportCustomerName");

const supportCustomerEmail =
    document.getElementById("supportCustomerEmail");

const supportMessages =
    document.getElementById("supportMessages");

const supportReplyForm =
    document.getElementById("supportReplyForm");

const supportReplyInput =
    document.getElementById("supportReplyInput");

const supportSendBtn =
    document.getElementById("supportSendBtn");



// ==================================================
// VARIABLES
// ==================================================

let currentView = "dashboard";

let allBookings = [];

let allRooms = [];

let roomFormMode = "edit";


// ==================================================
// CREATE ADD ROOM BUTTON
// ==================================================

const addRoomBtn =
    document.createElement("button");

addRoomBtn.id =
    "addRoomBtn";

addRoomBtn.type =
    "button";

addRoomBtn.className =
    "import-rooms-btn";

addRoomBtn.textContent =
    "+ Add Room";

addRoomBtn.style.background =
    "#198754";


// Put Add Room button before Import button

if (importRoomsBtn) {

    importRoomsBtn.parentNode.insertBefore(
        addRoomBtn,
        importRoomsBtn
    );

}


// ==================================================
// LOGOUT
// ==================================================

logoutBtn.addEventListener(
    "click",
    async function () {

        try {

            await signOut(auth);

            window.location.href =
                "login.html";

        } catch (error) {

            console.error(
                "Logout Error:",
                error
            );

        }

    }
);


// ==================================================
// AUTHENTICATION
// ==================================================

onAuthStateChanged(
    auth,
    async function (user) {

        if (!user) {

            window.location.href =
                "login.html";

            return;

        }


        if (user.uid !== ADMIN_UID) {

            alert(
                "Access denied. Admin only."
            );

            await signOut(auth);

            window.location.href =
                "customer-login.html";

            return;

        }


        try {

            const userDoc =
                await getDoc(
                    doc(
                        db,
                        "users",
                        user.uid
                    )
                );


            if (
                !userDoc.exists() ||
                userDoc.data().role !== "admin"
            ) {

                alert(
                    "Access denied."
                );

                await signOut(auth);

                window.location.href =
                    "customer-login.html";

                return;

            }


            console.log(
                "Admin authenticated successfully."
            );


            await loadBookings();

            await loadRooms();

            // Start Customer Support
            startSupportListener();

        } catch (error) {

            console.error(
                "Admin verification error:",
                error
            );

            alert(
                "Admin verification error: " +
                error.message
            );

        }

    }
);


// ==================================================
// SIDEBAR
// ==================================================

dashboardLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        showDashboard();

    }
);


bookingsLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        showBookings();

    }
);


roomsLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        showRooms();

    }
);

supportLink.addEventListener("click", function (event) {
    event.preventDefault();
    showSupport();

    }

);


// ==================================================
// SHOW DASHBOARD
// ==================================================

function showDashboard() {

    currentView = "dashboard";

 dashboardLink.classList.add("active");

bookingsLink.classList.remove("active");

roomsLink.classList.remove("active");

// إخفاء قسم الشات وإلغاء تفعيل زرّه
supportLink.classList.remove("active");

supportSection.style.display = "none";

dashboardSection.style.display = "block";

roomsSection.classList.remove("active");


    pageTitle.textContent =
        "Dashboard";

    pageSubtitle.textContent =
        "Manage your workspace bookings";

    statusFilter.value =
        "all";

    displayBookings();

}


// ==================================================
// SHOW BOOKINGS
// ==================================================

function showBookings() {

    currentView = "bookings";

    dashboardLink.classList.remove("active");

    bookingsLink.classList.add("active");

    roomsLink.classList.remove("active");

    supportLink.classList.remove("active");
    supportSection.style.display = "none";

    dashboardSection.style.display =
        "block";

    roomsSection.classList.remove(
        "active"
    );

    pageTitle.textContent =
        "New Bookings";

    pageSubtitle.textContent =
        "Manage pending reservations";

    statusFilter.value =
        "pending";

    displayBookings();

}


// ==================================================
// SHOW ROOMS
// ==================================================

function showRooms() {

    currentView = "rooms";

    dashboardLink.classList.remove("active");

    bookingsLink.classList.remove("active");

    roomsLink.classList.add("active");

    supportLink.classList.remove("active");

    supportSection.style.display = "none";

    dashboardSection.style.display =
        "none";

    roomsSection.classList.add(
        "active"
    );

    pageTitle.textContent =
        "Rooms";

    pageSubtitle.textContent =
        "Manage your workspace rooms";

    renderRooms();

}


// ==================================================
// SHOW CUSTOMER SUPPORT
// ==================================================

function showSupport() {

    currentView = "support";

    dashboardLink.classList.remove("active");
    bookingsLink.classList.remove("active");
    roomsLink.classList.remove("active");
    supportLink.classList.add("active");

    dashboardSection.style.display = "none";

    roomsSection.classList.remove("active");

    supportSection.style.display = "block";

    pageTitle.textContent = "Customer Support";

    pageSubtitle.textContent =
        "Manage customer conversations and replies";

}


// ==================================================
// LOAD ROOMS
// ==================================================

async function loadRooms() {

    roomsGrid.innerHTML = `

        <div class="rooms-empty">

            Loading rooms...

        </div>

    `;


    try {

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "rooms"
                )
            );


        allRooms = [];


        snapshot.forEach(
            function (roomDoc) {

                allRooms.push({

                    firestoreId:
                        roomDoc.id,

                    ...roomDoc.data()

                });

            }
        );


        if (allRooms.length > 0) {

            allRooms.sort(
                function (a, b) {

                    return (
                        Number(a.id || 0) -
                        Number(b.id || 0)
                    );

                }
            );


            renderRooms();

            return;

        }


        allRooms =
            currentRooms.map(
                function (room) {

                    return {

                        ...room,

                        firestoreId:
                            `room-${room.id}`,

                        isLocal:
                            true

                    };

                }
            );


        renderRooms();


    } catch (error) {

        console.error(
            "Error loading rooms:",
            error
        );


        allRooms =
            currentRooms.map(
                function (room) {

                    return {

                        ...room,

                        firestoreId:
                            `room-${room.id}`,

                        isLocal:
                            true

                    };

                }
            );


        renderRooms();


        roomsGrid.insertAdjacentHTML(
            "afterbegin",

            `

            <div
                style="
                    grid-column: 1 / -1;
                    background:#fff3cd;
                    color:#664d03;
                    border:1px solid #ffecb5;
                    padding:15px;
                    border-radius:10px;
                    margin-bottom:10px;
                "
            >

                ⚠️ Firebase rooms could not be loaded.

                <br>

                ${escapeHtml(error.message)}

                <br><br>

                You can still use
                <strong>
                    Import Current Rooms
                </strong>
                to upload the 7 rooms.

            </div>

            `

        );

    }

}


// ==================================================
// RENDER ROOMS
// ==================================================

function renderRooms() {

    const search =
        roomsSearchInput.value
            .toLowerCase()
            .trim();


    const filteredRooms =
        allRooms.filter(
            function (room) {

                return (
                    (room.name || "")
                        .toLowerCase()
                        .includes(search)
                );

            }
        );


    roomsGrid.innerHTML =
        "";


    if (filteredRooms.length === 0) {

        roomsGrid.innerHTML = `

            <div class="rooms-empty">

                No rooms found.

            </div>

        `;

        return;

    }


    filteredRooms.forEach(
        function (room) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "room-admin-card";


            const image =
                room.image || "";


            card.innerHTML = `

                <img
                    class="room-admin-image"
                    src="${escapeHtml(image)}"
                    alt="${escapeHtml(room.name || "Room")}"
                    onerror="this.style.opacity='0.3'"
                >

                <div class="room-admin-content">

                    <h3>
                        ${escapeHtml(
                            room.name ||
                            "Unnamed Room"
                        )}
                    </h3>

                    <div class="room-info">

                        <div>
                            👥
                            <strong>
                                Capacity:
                            </strong>
                            ${Number(room.capacity || 0)}
                        </div>

                        <div>
                            💰
                            <strong>
                                Price:
                            </strong>
                            ${Number(room.price || 0)}
                            EGP / hour
                        </div>

                        <div>
                            🕐
                            <strong>
                                Available:
                            </strong>
                            ${escapeHtml(
                                room.availableFrom || "-"
                            )}
                            -
                            ${escapeHtml(
                                room.availableTo || "-"
                            )}
                        </div>

                    </div>

                    <div
                        class="room-admin-actions"
                        style="
                            display:grid;
                            grid-template-columns:1fr 1fr;
                            gap:8px;
                        "
                    >

                        <button
                            class="edit-room-btn"
                            type="button"
                            data-room-id="${escapeHtml(room.firestoreId)}"
                        >
                            Edit Room
                        </button>

                        <button
                            class="delete-room-btn"
                            type="button"
                            data-room-id="${escapeHtml(room.firestoreId)}"
                            style="
                                width:100%;
                                border:none;
                                background:#dc3545;
                                color:white;
                                padding:11px;
                                border-radius:8px;
                                cursor:pointer;
                                font-weight:600;
                            "
                        >
                            Delete Room
                        </button>

                    </div>

                </div>

            `;


            roomsGrid.appendChild(
                card
            );

        }
    );

}


// ==================================================
// ESCAPE HTML
// ==================================================

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// ==================================================
// ROOM SEARCH
// ==================================================

roomsSearchInput.addEventListener(
    "input",
    renderRooms
);


// ==================================================
// ADD ROOM
// ==================================================

addRoomBtn.addEventListener(
    "click",
    function () {

        roomFormMode = "add";

        editRoomId.value = "";

        editRoomName.value = "";

        editRoomCapacity.value = "";

        editRoomPrice.value = "";

        editAvailableFrom.value =
            "08:00 AM";

        editAvailableTo.value =
            "10:00 PM";

        editRoomDescription.value = "";

        editRoomFeatures.value = "";

        editRoomImage.value = "";

        currentRoomImage.src = "";

        editRoomGallery.value = "";

        editRoomVideo.value = "";

        roomModal.querySelector(
            ".room-modal-header h2"
        ).textContent =
            "Add New Room";

        saveRoomBtn.textContent =
            "Add Room";

        roomModal.classList.add(
            "show"
        );

    }
);


// ==================================================
// IMPORT CURRENT ROOMS
// ==================================================

importRoomsBtn.addEventListener(
    "click",
    async function () {

        const confirmed =
            confirm(
                "Import the 7 current rooms into Firestore?"
            );


        if (!confirmed) {

            return;

        }


        importRoomsBtn.disabled =
            true;

        importRoomsBtn.textContent =
            "Importing...";


        try {

            for (
                const room of currentRooms
            ) {

                const roomData = {

                    id:
                        room.id,

                    name:
                        room.name,

                    image:
                        room.image,

                    gallery:
                        room.gallery || [],

                    video:
                        room.video || null,

                    capacity:
                        Number(
                            room.capacity || 0
                        ),

                    price:
                        Number(
                            room.price || 0
                        ),

                    availableFrom:
                        room.availableFrom,

                    availableTo:
                        room.availableTo,

                    description:
                        room.description || "",

                    features:
                        room.features || []

                };


                await setDoc(
                    doc(
                        db,
                        "rooms",
                        `room-${room.id}`
                    ),
                    roomData
                );

            }


            alert(
                "All 7 rooms were imported successfully."
            );


            await loadRooms();


        } catch (error) {

            console.error(
                "Import Rooms Error:",
                error
            );


            alert(
                "Import failed.\n\n" +
                error.code +
                "\n\n" +
                error.message
            );


        } finally {

            importRoomsBtn.disabled =
                false;

            importRoomsBtn.textContent =
                "Import Current Rooms";

        }

    }
);


// ==================================================
// ROOM CARD CLICK
// ==================================================

roomsGrid.addEventListener(
    "click",
    function (event) {

        const editButton =
            event.target.closest(
                ".edit-room-btn"
            );

        const deleteButton =
            event.target.closest(
                ".delete-room-btn"
            );


        if (editButton) {

            openRoomEdit(
                editButton.dataset.roomId
            );

            return;

        }


        if (deleteButton) {

            deleteRoom(
                deleteButton.dataset.roomId
            );

        }

    }
);


// ==================================================
// OPEN ROOM EDIT
// ==================================================

function openRoomEdit(
    firestoreId
) {

    const room =
        allRooms.find(
            function (item) {

                return (
                    String(
                        item.firestoreId
                    ) ===
                    String(
                        firestoreId
                    )
                );

            }
        );


    if (!room) {

        alert(
            "Room not found."
        );

        return;

    }


    roomFormMode = "edit";


    editRoomId.value =
        room.firestoreId;

    editRoomName.value =
        room.name || "";

    editRoomCapacity.value =
        room.capacity || "";

    editRoomPrice.value =
        room.price || "";

    editAvailableFrom.value =
        room.availableFrom || "";

    editAvailableTo.value =
        room.availableTo || "";

    editRoomDescription.value =
        room.description || "";

    editRoomFeatures.value =
        Array.isArray(room.features)
            ? room.features.join(", ")
            : "";

    editRoomImage.value =
        room.image || "";

    currentRoomImage.src =
        room.image || "";

    editRoomGallery.value =
        Array.isArray(room.gallery)
            ? room.gallery.join(", ")
            : "";

    editRoomVideo.value =
        room.video || "";


    roomModal.querySelector(
        ".room-modal-header h2"
    ).textContent =
        "Edit Room";

    saveRoomBtn.textContent =
        "Save Changes";


    roomModal.classList.add(
        "show"
    );

}


// ==================================================
// DELETE ROOM
// ==================================================

async function deleteRoom(
    firestoreId
) {

    const room =
        allRooms.find(
            function (item) {

                return (
                    String(
                        item.firestoreId
                    ) ===
                    String(
                        firestoreId
                    )
                );

            }
        );


    if (!room) {

        alert(
            "Room not found."
        );

        return;

    }


    if (room.isLocal) {

        alert(
            "This room is currently local only.\n\nPlease click Import Current Rooms first, then delete it."
        );

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete "${room.name}"?`
        );


    if (!confirmed) {

        return;

    }


    try {

        const roomRef =
            doc(
                db,
                "rooms",
                firestoreId
            );


        const roomSnapshot =
            await getDoc(
                roomRef
            );


        if (!roomSnapshot.exists()) {

            alert(
                "Room no longer exists."
            );

            await loadRooms();

            return;

        }


        await deleteDoc(
            roomRef
        );


        allRooms =
            allRooms.filter(
                function (item) {

                    return (
                        String(
                            item.firestoreId
                        ) !==
                        String(
                            firestoreId
                        )
                    );

                }
            );


        renderRooms();


        alert(
            "Room deleted successfully."
        );


    } catch (error) {

        console.error(
            "DELETE ROOM ERROR:",
            error
        );


        alert(
            "Delete failed.\n\n" +
            error.code +
            "\n\n" +
            error.message
        );

    }

}


// ==================================================
// CLOSE ROOM MODAL
// ==================================================

function closeRoomEditor() {

    roomModal.classList.remove(
        "show"
    );

}


closeRoomModal.addEventListener(
    "click",
    closeRoomEditor
);


cancelRoomEdit.addEventListener(
    "click",
    closeRoomEditor
);


roomModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            roomModal
        ) {

            closeRoomEditor();

        }

    }
);


// ==================================================
// IMAGE PREVIEW
// ==================================================

editRoomImage.addEventListener(
    "input",
    function () {

        currentRoomImage.src =
            editRoomImage.value.trim();

    }
);


// ==================================================
// SAVE / ADD ROOM
// ==================================================

roomForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        saveRoomBtn.disabled =
            true;

        saveRoomBtn.textContent =
            roomFormMode === "add"
                ? "Adding..."
                : "Saving...";


        try {

            const gallery =
                editRoomGallery.value
                    .split(",")
                    .map(function (item) {

                        return item.trim();

                    })
                    .filter(function (item) {

                        return item !== "";

                    });


            const features =
                editRoomFeatures.value
                    .split(",")
                    .map(function (item) {

                        return item.trim();

                    })
                    .filter(function (item) {

                        return item !== "";

                    });


            const roomName =
                editRoomName.value.trim();


            if (!roomName) {

                alert(
                    "Please enter room name."
                );

                return;

            }


            const capacity =
                Number(
                    editRoomCapacity.value
                );


            const price =
                Number(
                    editRoomPrice.value
                );


            if (
                !capacity ||
                capacity < 1
            ) {

                alert(
                    "Please enter a valid capacity."
                );

                return;

            }


            if (
                price < 0 ||
                Number.isNaN(price)
            ) {

                alert(
                    "Please enter a valid price."
                );

                return;

            }


            const updatedData = {

                name:
                    roomName,

                capacity:
                    capacity,

                price:
                    price,

                availableFrom:
                    editAvailableFrom.value.trim(),

                availableTo:
                    editAvailableTo.value.trim(),

                description:
                    editRoomDescription.value.trim(),

                features:
                    features,

                image:
                    editRoomImage.value.trim(),

                gallery:
                    gallery,

                video:
                    editRoomVideo.value.trim() ||
                    null

            };


            // ==========================================
            // ADD NEW ROOM
            // ==========================================

            if (
                roomFormMode ===
                "add"
            ) {

                let highestId = 0;


                allRooms.forEach(
                    function (room) {

                        const roomId =
                            Number(
                                room.id
                            );


                        if (
                            !Number.isNaN(roomId) &&
                            roomId > highestId
                        ) {

                            highestId =
                                roomId;

                        }

                    }
                );


                const newRoomId =
                    highestId + 1;


                const newFirestoreId =
                    `room-${newRoomId}`;


                const newRoomData = {

                    id:
                        newRoomId,

                    ...updatedData

                };


                await setDoc(
                    doc(
                        db,
                        "rooms",
                        newFirestoreId
                    ),
                    newRoomData
                );


                const checkRoom =
                    await getDoc(
                        doc(
                            db,
                            "rooms",
                            newFirestoreId
                        )
                    );


                if (!checkRoom.exists()) {

                    throw new Error(
                        "Room was not found after adding."
                    );

                }


                allRooms.push({

                    firestoreId:
                        newFirestoreId,

                    ...newRoomData,

                    isLocal:
                        false

                });


                allRooms.sort(
                    function (a, b) {

                        return (
                            Number(a.id || 0) -
                            Number(b.id || 0)
                        );

                    }
                );


                closeRoomEditor();

                renderRooms();


                alert(
                    "Room added successfully."
                );


                return;

            }


            // ==========================================
            // EDIT EXISTING ROOM
            // ==========================================

            const firestoreId =
                editRoomId.value;


            if (!firestoreId) {

                throw new Error(
                    "Room ID is missing."
                );

            }


            const roomRef =
                doc(
                    db,
                    "rooms",
                    firestoreId
                );


            await setDoc(
                roomRef,
                {

                    ...updatedData,

                    id: Number(
                        firestoreId.replace(
                            "room-",
                            ""
                        )
                    )

                },
                {
                    merge: true
                }
            );


            const checkRoom =
                await getDoc(
                    roomRef
                );


            if (!checkRoom.exists()) {

                throw new Error(
                    "Room was not found after saving."
                );

            }


            const roomIndex =
                allRooms.findIndex(
                    function (room) {

                        return (
                            String(
                                room.firestoreId
                            ) ===
                            String(
                                firestoreId
                            )
                        );

                    }
                );


            if (
                roomIndex !==
                -1
            ) {

                allRooms[roomIndex] = {

                    ...allRooms[roomIndex],

                    ...updatedData,

                    isLocal:
                        false

                };

            }


            closeRoomEditor();

            renderRooms();


            alert(
                "Room updated successfully."
            );


        } catch (error) {

            console.error(
                "ROOM SAVE ERROR:",
                error
            );


            alert(
                "Save failed.\n\n" +
                (error.code || "") +
                "\n\n" +
                error.message
            );


        } finally {

            saveRoomBtn.disabled =
                false;


            saveRoomBtn.textContent =
                roomFormMode === "add"
                    ? "Add Room"
                    : "Save Changes";

        }

    }
);


// ==================================================
// NOTIFICATIONS
// ==================================================

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );

const notificationBadge =
    document.getElementById(
        "notificationBadge"
    );

const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );

const notificationList =
    document.getElementById(
        "notificationList"
    );

const markAllReadBtn =
    document.getElementById(
        "markAllReadBtn"
    );


let notifications = [];


// ==================================================
// NOTIFICATION SOUND
// ==================================================

function playNotificationSound() {

    notificationSound.currentTime =
        0;


    notificationSound
        .play()
        .catch(
            function (error) {

                console.log(
                    "Sound could not play:",
                    error
                );

            }
        );

}


// ==================================================
// NOTIFICATION BUTTON
// ==================================================

notificationBtn.addEventListener(
    "click",
    function () {

        notificationPanel.classList.toggle(
            "show"
        );

    }
);


// ==================================================
// MARK ALL READ
// ==================================================

markAllReadBtn.addEventListener(
    "click",
    function () {

        notifications = [];

        updateNotificationUI();

    }
);


// ==================================================
// ADD NOTIFICATION
// ==================================================

function addNotification(
    type,
    name,
    room
) {

    notifications.unshift({

        type,
        name,
        room

    });


    if (notifications.length > 20) {

        notifications.pop();

    }


    updateNotificationUI();

    playNotificationSound();

}


// ==================================================
// NOTIFICATION UI
// ==================================================

function updateNotificationUI() {

    notificationList.innerHTML =
        "";


    if (notifications.length === 0) {

        notificationList.innerHTML = `

            <div class="no-notifications">

                No new notifications

            </div>

        `;

        notificationBadge.classList.add(
            "hidden"
        );

        return;

    }


    notificationBadge.textContent =
        notifications.length;


    notificationBadge.classList.remove(
        "hidden"
    );


    notifications.forEach(
        function (notification) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "notification-item";


            let title = "";

            let message = "";

            let icon = "🔔";


            if (
                notification.type ===
                "new_booking"
            ) {

                title =
                    "New Booking";

                message =
                    `${notification.name || "Customer"} booked ${notification.room || "a room"}.`;

                icon =
                    "📅";

            }

            else if (
                notification.type ===
                "confirmed"
            ) {

                title =
                    "Booking Confirmed";

                message =
                    `${notification.name || "Customer"}'s booking for ${notification.room || "a room"} was confirmed.`;

                icon =
                    "✅";

            }

            else if (
                notification.type ===
                "cancelled"
            ) {

                title =
                    "Booking Cancelled";

                message =
                    `${notification.name || "Customer"}'s booking for ${notification.room || "a room"} was cancelled.`;

                icon =
                    "❌";

            }

            else if (
                notification.type ===
                "deleted"
            ) {

                title =
                    "Booking Deleted";

                message =
                    `${notification.name || "Customer"}'s booking for ${notification.room || "a room"} was deleted.`;

                icon =
                    "🗑️";

            }


            item.innerHTML = `

                <div class="notification-icon">
                    ${icon}
                </div>

                <div class="notification-content">

                    <strong>
                        ${escapeHtml(title)}
                    </strong>

                    <p>
                        ${escapeHtml(message)}
                    </p>

                    <span class="notification-time">
                        Just now
                    </span>

                </div>

            `;


            notificationList.appendChild(
                item
            );

        }
    );

}


// ==================================================
// REAL-TIME BOOKING NOTIFICATIONS
// ==================================================

let firstSnapshot = true;


onSnapshot(
    collection(
        db,
        "bookings"
    ),

    function (snapshot) {

        if (firstSnapshot) {

            firstSnapshot = false;

            return;

        }


        snapshot.docChanges().forEach(
            function (change) {

                const booking =
                    change.doc.data();


                if (
                    change.type ===
                    "added"
                ) {

                    addNotification(
                        "new_booking",
                        booking.name,
                        booking.room
                    );

                }


                if (
                    change.type ===
                    "modified"
                ) {

                    if (
                        booking.status ===
                        "confirmed"
                    ) {

                        addNotification(
                            "confirmed",
                            booking.name,
                            booking.room
                        );

                    }

                    else if (
                        booking.status ===
                        "cancelled"
                    ) {

                        addNotification(
                            "cancelled",
                            booking.name,
                            booking.room
                        );

                    }

                }


                if (
                    change.type ===
                    "removed"
                ) {

                    addNotification(
                        "deleted",
                        booking.name,
                        booking.room
                    );

                }

            }
        );

    },

    function (error) {

        console.error(
            "Notification listener error:",
            error
        );

    }
);


// ==================================================
// BOOKINGS
// ==================================================

async function loadBookings() {

    try {

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "bookings"
                )
            );


        allBookings = [];


        snapshot.forEach(
            function (document) {

                allBookings.push({

                    id:
                        document.id,

                    ...document.data()

                });

            }
        );


        updateStats();

        displayBookings();


    } catch (error) {

        console.error(
            "Error loading bookings:",
            error
        );


        bookingsTable.innerHTML = `

            <tr>

                <td colspan="10">

                    <div class="empty">

                        Error loading bookings

                    </div>

                </td>

            </tr>

        `;

    }

}


// ==================================================
// DISPLAY BOOKINGS
// ==================================================

function displayBookings() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let selectedStatus =
        statusFilter.value;


    if (currentView === "bookings") {

        selectedStatus =
            "pending";

    }


    const filteredBookings =
        allBookings.filter(
            function (booking) {

                const matchesSearch =

                    (booking.room || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (booking.name || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (booking.email || "")
                        .toLowerCase()
                        .includes(search)

                    ||

                    (booking.phone || "")
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =

                    selectedStatus === "all"

                    ||

                    booking.status ===
                    selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    bookingsTable.innerHTML =
        "";


    if (filteredBookings.length === 0) {

        bookingsTable.innerHTML = `

            <tr>

                <td colspan="10">

                    <div class="empty">

                        No bookings found

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    filteredBookings.forEach(
        function (booking) {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHtml(booking.room || "-")}
                    </strong>
                </td>

                <td>
                    ${escapeHtml(booking.date || "-")}
                </td>

                <td>
                    ${escapeHtml(booking.from || "-")}
                    -
                    ${escapeHtml(booking.to || "-")}
                </td>

                <td>
                    ${escapeHtml(booking.name || "-")}
                </td>

                <td>
                    ${escapeHtml(booking.email || "-")}
                </td>

                <td>
                    ${escapeHtml(booking.phone || "-")}
                </td>

                <td>
                    ${Number(booking.people || 0)}
                </td>

                <td>
                    ${Number(booking.total || 0)} EGP
                </td>

                <td>

                    <span
                        class="status ${escapeHtml(
                            booking.status || "pending"
                        )}"
                    >
                        ${escapeHtml(
                            booking.status || "pending"
                        )}
                    </span>

                </td>

                <td>

                    <button
                        class="action-btn confirm-btn"
                        data-id="${escapeHtml(booking.id)}"
                        data-action="confirm"
                    >
                        Confirm
                    </button>

                    <button
                        class="action-btn cancel-btn"
                        data-id="${escapeHtml(booking.id)}"
                        data-action="cancel"
                    >
                        Cancel
                    </button>

                    <button
                        class="action-btn delete-btn"
                        data-id="${escapeHtml(booking.id)}"
                        data-action="delete"
                    >
                        Delete
                    </button>

                </td>

            `;


            bookingsTable.appendChild(
                row
            );

        }
    );

}


// ==================================================
// STATISTICS
// ==================================================

function updateStats() {

    const total =
        allBookings.length;


    const pending =
        allBookings.filter(
            function (booking) {

                return (
                    booking.status ===
                    "pending"
                );

            }
        ).length;


    const confirmed =
        allBookings.filter(
            function (booking) {

                return (
                    booking.status ===
                    "confirmed"
                );

            }
        ).length;


    const revenue =
        allBookings.reduce(
            function (
                sum,
                booking
            ) {

                if (
                    booking.status ===
                    "confirmed"
                ) {

                    return (
                        sum +
                        Number(
                            booking.total || 0
                        )
                    );

                }


                return sum;

            },
            0
        );


    totalBookings.textContent =
        total;

    pendingBookings.textContent =
        pending;

    confirmedBookings.textContent =
        confirmed;

    totalRevenue.textContent =
        `${revenue} EGP`;


    const newBookings =
        allBookings.filter(
            function (booking) {

                return (
                    booking.status ===
                    "pending"
                );

            }
        ).length;


    newBookingsBadge.textContent =
        newBookings;


    if (newBookings === 0) {

        newBookingsBadge.classList.add(
            "hidden"
        );

    } else {

        newBookingsBadge.classList.remove(
            "hidden"
        );

    }

}


// ==================================================
// UPDATE BOOKING STATUS
// ==================================================

async function updateBookingStatus(
    bookingId,
    newStatus
) {

    try {

        const bookingRef =
            doc(
                db,
                "bookings",
                bookingId
            );


        const bookingSnapshot =
            await getDoc(
                bookingRef
            );


        if (!bookingSnapshot.exists()) {

            console.error(
                "Booking not found."
            );

            return;

        }


        await updateDoc(
            bookingRef,
            {
                status:
                    newStatus
            }
        );


        await loadBookings();


    } catch (error) {

        console.error(
            "Error updating booking:",
            error
        );


        alert(
            "Something went wrong: " +
            error.message
        );

    }

}


// ==================================================
// DELETE BOOKING
// ==================================================

async function deleteBooking(
    bookingId
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this booking?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const bookingRef =
            doc(
                db,
                "bookings",
                bookingId
            );


        const bookingSnapshot =
            await getDoc(
                bookingRef
            );


        if (!bookingSnapshot.exists()) {

            console.error(
                "Booking not found."
            );

            return;

        }


        await deleteDoc(
            bookingRef
        );


        await loadBookings();


    } catch (error) {

        console.error(
            "Error deleting booking:",
            error
        );


        alert(
            "Something went wrong: " +
            error.message
        );

    }

}


// ==================================================
// BOOKING BUTTONS
// ==================================================

bookingsTable.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {

            return;

        }


        const bookingId =
            button.dataset.id;

        const action =
            button.dataset.action;


        if (action === "confirm") {

            updateBookingStatus(
                bookingId,
                "confirmed"
            );

        }


        if (action === "cancel") {

            updateBookingStatus(
                bookingId,
                "cancelled"
            );

        }


        if (action === "delete") {

            deleteBooking(
                bookingId
            );

        }

    }
);


// ==================================================
// SEARCH
// ==================================================

searchInput.addEventListener(
    "input",
    displayBookings
);


// ==================================================
// STATUS FILTER
// ==================================================

statusFilter.addEventListener(
    "change",
    displayBookings
);


 // ==================================================
 // CUSTOMER SUPPORT CHAT
 // ==================================================

let supportChats = [];
let selectedSupportChatId = null;
let supportChatsUnsubscribe = null;
let supportMessagesUnsubscribe = null;

function getSupportTime(value) {
    if (!value) return 0;

    return typeof value.toMillis === "function"
        ? value.toMillis()
        : 0;
}

// ==================================================
// CREATE DELETE CHAT BUTTON
// ==================================================

let deleteSupportChatBtn = document.getElementById(
    "deleteSupportChatBtn"
);

if (!deleteSupportChatBtn && supportChatHeader) {
    deleteSupportChatBtn = document.createElement("button");
    deleteSupportChatBtn.id = "deleteSupportChatBtn";
    deleteSupportChatBtn.type = "button";
    deleteSupportChatBtn.textContent = "Delete Chat";
    deleteSupportChatBtn.style.cssText = `
        background: #dc3545;
        color: white;
        border: none;
        padding: 9px 13px;
        border-radius: 7px;
        cursor: pointer;
        font-weight: 600;
        margin: 8px 0;
    `;

    supportChatHeader.appendChild(deleteSupportChatBtn);
}

if (deleteSupportChatBtn) {
    deleteSupportChatBtn.disabled = true;

    deleteSupportChatBtn.addEventListener("click", deleteSupportConversation);
}

// ==================================================
// LISTEN TO CHATS
// ==================================================

function startSupportListener() {
    if (supportChatsUnsubscribe) {
        supportChatsUnsubscribe();
    }

    supportChatsUnsubscribe = onSnapshot(
        collection(db, "supportChats"),
        function (snapshot) {
            supportChats = snapshot.docs.map(function (item) {
                return {
                    id: item.id,
                    ...item.data()
                };
            });

            supportChats.sort(function (a, b) {
                return getSupportTime(b.lastMessageAt)
                    - getSupportTime(a.lastMessageAt);
            });

            renderSupportConversations();

            const unreadCount = supportChats.filter(function (chat) {
                return chat.unreadForAdmin === true;
            }).length;

            supportMessagesBadge.textContent = unreadCount;
            supportMessagesBadge.classList.toggle(
                "hidden",
                unreadCount === 0
            );

            // If the selected conversation was deleted elsewhere.
            if (
                selectedSupportChatId &&
                !supportChats.some(function (chat) {
                    return chat.id === selectedSupportChatId;
                })
            ) {
                selectedSupportChatId = null;

                if (supportMessagesUnsubscribe) {
                    supportMessagesUnsubscribe();
                    supportMessagesUnsubscribe = null;
                }

                supportMessages.replaceChildren();
                supportCustomerName.textContent = "Select a conversation";
                supportCustomerEmail.textContent = "";

                supportReplyInput.disabled = true;
                supportSendBtn.disabled = true;

                if (deleteSupportChatBtn) {
                    deleteSupportChatBtn.disabled = true;
                }
            }
        },
        function (error) {
            console.error("Support chats error:", error);
        }
    );
}

// ==================================================
// RENDER CHAT LIST
// ==================================================

function renderSupportConversations() {
    const searchText = supportSearch.value.trim().toLowerCase();

    const filteredChats = supportChats.filter(function (chat) {
        return (chat.customerName || "").toLowerCase().includes(searchText)
            || (chat.customerEmail || "").toLowerCase().includes(searchText);
    });

    supportConversationCount.textContent = supportChats.length;
    supportConversationsList.replaceChildren();

    if (filteredChats.length === 0) {
        const empty = document.createElement("div");
        empty.className = "support-empty";
        empty.textContent = supportChats.length === 0
            ? "No conversations yet."
            : "No matching conversations.";

        supportConversationsList.appendChild(empty);
        return;
    }

    filteredChats.forEach(function (chat) {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "support-conversation-item";

        if (chat.id === selectedSupportChatId) {
            item.classList.add("active");
        }

        if (chat.unreadForAdmin === true) {
            item.classList.add("unread");
        }

        const name = document.createElement("strong");
        name.textContent = chat.customerName || "Customer";

        const email = document.createElement("span");
        email.textContent = chat.customerEmail || "";

        const lastMessage = document.createElement("p");
        lastMessage.textContent = chat.lastMessage || "No messages yet";

        item.append(name, email, lastMessage);

        item.addEventListener("click", function () {
            openSupportConversation(chat.id);
        });

        supportConversationsList.appendChild(item);
    });
}

supportSearch.addEventListener("input", renderSupportConversations);

// ==================================================
// UPDATE CHAT PREVIEW AFTER EDIT / DELETE
// ==================================================

async function refreshSupportChatPreview(chatId) {
    const messagesRef = collection(
        db,
        "supportChats",
        chatId,
        "messages"
    );

    const snapshot = await getDocs(messagesRef);

    const messages = snapshot.docs.map(function (item) {
        return {
            id: item.id,
            ...item.data()
        };
    });

    messages.sort(function (a, b) {
        return getSupportTime(b.createdAt)
            - getSupportTime(a.createdAt);
    });

    const latestMessage = messages[0];

    await updateDoc(doc(db, "supportChats", chatId), {
        lastMessage: latestMessage
            ? latestMessage.text
            : "No messages yet",

        lastMessageAt: latestMessage && latestMessage.createdAt
            ? latestMessage.createdAt
            : serverTimestamp(),

        lastSenderUid: latestMessage
            ? latestMessage.senderUid
            : "",

        updatedAt: serverTimestamp()
    });
}

// ==================================================
// EDIT MESSAGE
// ==================================================

async function editSupportMessage(chatId, message) {
    // Admin can edit only their own messages.
    const currentUser = auth.currentUser;

    if (!currentUser || message.senderUid !== currentUser.uid) {
        alert("You can edit only your own messages.");
        return;
    }

    const newText = prompt(
        "Edit your message:",
        message.text || ""
    );

    if (newText === null) return;

    const trimmedText = newText.trim();

    if (!trimmedText) {
        alert("The message cannot be empty.");
        return;
    }

    if (trimmedText.length > 2000) {
        alert("The message must be 2000 characters or less.");
        return;
    }

    try {
        await updateDoc(
            doc(db, "supportChats", chatId, "messages", message.id),
            {
                text: trimmedText,
                editedAt: serverTimestamp()
            }
        );

        await refreshSupportChatPreview(chatId);
    } catch (error) {
        console.error("Edit support message error:", error);
        alert("Could not edit the message: " + error.message);
    }
}

// ==================================================
// DELETE MESSAGE
// ==================================================

async function deleteSupportMessage(chatId, message) {
    if (!confirm("Delete this message? This action cannot be undone.")) {
        return;
    }

    try {
        await deleteDoc(
            doc(db, "supportChats", chatId, "messages", message.id)
        );

        await refreshSupportChatPreview(chatId);
    } catch (error) {
        console.error("Delete support message error:", error);
        alert("Could not delete the message: " + error.message);
    }
}

// ==================================================
// DELETE ENTIRE CONVERSATION
// ==================================================

async function deleteSupportConversation() {
    const chatId = selectedSupportChatId;

    if (!chatId) {
        alert("Select a conversation first.");
        return;
    }

    const confirmed = confirm(
        "Delete this entire conversation and ALL its messages?\n\nThis cannot be undone."
    );

    if (!confirmed) return;

    const currentUser = auth.currentUser;

    if (!currentUser || currentUser.uid !== ADMIN_UID) {
        alert("Only the administrator can delete a conversation.");
        return;
    }

    deleteSupportChatBtn.disabled = true;
    deleteSupportChatBtn.textContent = "Deleting...";

    try {
        // Stop the live listener before deleting the messages.
        if (supportMessagesUnsubscribe) {
            supportMessagesUnsubscribe();
            supportMessagesUnsubscribe = null;
        }

        // Firestore does not automatically delete subcollection documents.
        const messagesRef = collection(
            db,
            "supportChats",
            chatId,
            "messages"
        );

        while (true) {
            const snapshot = await getDocs(messagesRef);

            if (snapshot.empty) break;

            // Delete individually to avoid the 500-write batch limit.
            for (const messageDoc of snapshot.docs) {
                await deleteDoc(messageDoc.ref);
            }
        }

        // Delete the parent conversation after its messages are removed.
        await deleteDoc(doc(db, "supportChats", chatId));

        selectedSupportChatId = null;

        supportMessages.replaceChildren();
        supportCustomerName.textContent = "Select a conversation";
        supportCustomerEmail.textContent = "";

        supportReplyInput.value = "";
        supportReplyInput.disabled = true;
        supportSendBtn.disabled = true;

        alert("Conversation deleted successfully.");
    } catch (error) {
        console.error("Delete conversation error:", error);

        alert(
            "Could not delete the entire conversation.\n\n" +
            error.message
        );
    } finally {
        if (deleteSupportChatBtn) {
            deleteSupportChatBtn.disabled = !selectedSupportChatId;
            deleteSupportChatBtn.textContent = "Delete Chat";
        }
    }
}

// ==================================================
// OPEN CHAT
// ==================================================

function openSupportConversation(chatId) {
    const chat = supportChats.find(function (item) {
        return item.id === chatId;
    });

    if (!chat) return;

    selectedSupportChatId = chatId;

    supportCustomerName.textContent = chat.customerName || "Customer";
    supportCustomerEmail.textContent = chat.customerEmail || "";

    supportMessages.replaceChildren();

    supportReplyInput.disabled = false;
    supportSendBtn.disabled = false;

    if (deleteSupportChatBtn) {
        deleteSupportChatBtn.disabled = false;
    }

    renderSupportConversations();

    if (supportMessagesUnsubscribe) {
        supportMessagesUnsubscribe();
        supportMessagesUnsubscribe = null;
    }

    if (chat.unreadForAdmin === true) {
        updateDoc(
            doc(db, "supportChats", chatId),
            { unreadForAdmin: false }
        ).catch(function (error) {
            console.error("Could not mark chat as read:", error);
        });
    }

    supportMessagesUnsubscribe = onSnapshot(
        collection(db, "supportChats", chatId, "messages"),

        function (snapshot) {
            if (selectedSupportChatId !== chatId) return;

            const messages = snapshot.docs.map(function (item) {
                return {
                    id: item.id,
                    ...item.data()
                };
            });

            messages.sort(function (a, b) {
                return getSupportTime(a.createdAt)
                    - getSupportTime(b.createdAt);
            });

            supportMessages.replaceChildren();

            if (messages.length === 0) {
                const empty = document.createElement("div");
                empty.className = "support-empty";
                empty.textContent = "No messages in this conversation yet.";
                supportMessages.appendChild(empty);
                return;
            }

            messages.forEach(function (message) {
                const bubble = document.createElement("div");

                bubble.className = message.senderRole === "staff"
                    ? "support-message staff"
                    : "support-message customer";

                const text = document.createElement("p");
                text.className = "support-message-text";
                text.textContent = message.text || "";

                const time = document.createElement("small");
                time.className = "support-message-time";

                if (
                    message.createdAt &&
                    typeof message.createdAt.toDate === "function"
                ) {
                    time.textContent = message.createdAt
                        .toDate()
                        .toLocaleString("en-GB");
                } else {
                    time.textContent = "Sending...";
                }

                if (message.editedAt) {
                    time.textContent += " (edited)";
                }

                bubble.append(text, time);

                const actions = document.createElement("div");
                actions.className = "support-message-actions";
                actions.style.cssText = `
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;
                    flex-wrap: wrap;
                `;

                // Edit button appears only on the admin's own messages.
                if (
                    message.senderRole === "staff" &&
                    auth.currentUser &&
                    message.senderUid === auth.currentUser.uid
                ) {
                    const editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.textContent = "Edit";
                    editButton.style.cssText = `
                        border: none;
                        padding: 5px 9px;
                        border-radius: 5px;
                        cursor: pointer;
                    `;

                    editButton.addEventListener("click", function () {
                        editSupportMessage(chatId, message);
                    });

                    actions.appendChild(editButton);
                }

                // Admin may delete messages according to the supplied rules.
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.textContent = "Delete";
                deleteButton.style.cssText = `
                    border: none;
                    background: #dc3545;
                    color: white;
                    padding: 5px 9px;
                    border-radius: 5px;
                    cursor: pointer;
                `;

                deleteButton.addEventListener("click", function () {
                    deleteSupportMessage(chatId, message);
                });

                actions.appendChild(deleteButton);
                bubble.appendChild(actions);

                supportMessages.appendChild(bubble);
            });

            supportMessages.scrollTop = supportMessages.scrollHeight;
        },

        function (error) {
            console.error("Support messages error:", error);
        }
    );
}

// ==================================================
// SEND REPLY
// ==================================================

supportReplyForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const text = supportReplyInput.value.trim();
    const chatId = selectedSupportChatId;
    const currentUser = auth.currentUser;

    if (!text || !chatId) return;

    if (!currentUser || currentUser.uid !== ADMIN_UID) {
        alert("Please sign in again with the administrator account.");
        return;
    }

    supportSendBtn.disabled = true;

    try {
        await addDoc(
            collection(db, "supportChats", chatId, "messages"),
            {
                senderUid: currentUser.uid,
                senderRole: "staff",
                text: text,
                createdAt: serverTimestamp()
            }
        );

        await updateDoc(
            doc(db, "supportChats", chatId),
            {
                lastMessage: text,
                lastMessageAt: serverTimestamp(),
                lastSenderUid: currentUser.uid,
                unreadForCustomer: true,
                unreadForAdmin: false,
                updatedAt: serverTimestamp()
            }
        );

        if (selectedSupportChatId === chatId) {
            supportReplyInput.value = "";
        }
    } catch (error) {
        console.error("Could not send support reply:", error);

        alert(
            "Failed to send reply. Check the console and Firestore rules."
        );
    } finally {
        supportSendBtn.disabled = !selectedSupportChatId;
    }
});
