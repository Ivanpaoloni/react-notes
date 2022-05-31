import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA79zLPc5c_i6p3WWunfJvRfk-FrEQ2ZX0",
  authDomain: "react-notes-6ae06.firebaseapp.com",
  projectId: "react-notes-6ae06",
  storageBucket: "react-notes-6ae06.appspot.com",
  messagingSenderId: "225377691296",
  appId: "1:225377691296:web:d858599c0be47c78614bc5"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();