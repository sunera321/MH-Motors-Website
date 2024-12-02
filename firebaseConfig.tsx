import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4amvOjnaUeHsTHy5dQ5tHLOEC4QbUPPc",
    authDomain: "m-h-mortars.firebaseapp.com",
    projectId: "m-h-mortars",
    storageBucket: "m-h-mortars.firebasestorage.app",
    messagingSenderId: "911373904562",
    appId: "1:911373904562:web:d82e9b074c954f61a3f7ab",
    measurementId: "G-PJ9D913YTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
