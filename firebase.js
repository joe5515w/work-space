
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

export { db };