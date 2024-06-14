// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_WQffJc1oTgRGDYUmShJqzH0SfWLGXmg",
  authDomain: "bussiness-directory-a1c67.firebaseapp.com",
  projectId: "bussiness-directory-a1c67",
  storageBucket: "bussiness-directory-a1c67.appspot.com",
  messagingSenderId: "960666530570",
  appId: "1:960666530570:web:d6c03a0269ffc9c3d580f3",
  measurementId: "G-9N09TL43W9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
