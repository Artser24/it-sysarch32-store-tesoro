// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9dpsaQrsADyM0URDdAyiQIv1ypf9eLNM",
  authDomain: "it-sysarch32-store-tesoro.firebaseapp.com",
  projectId: "it-sysarch32-store-tesoro",
  storageBucket: "it-sysarch32-store-tesoro.appspot.com",
  messagingSenderId: "948830933751",
  appId: "1:948830933751:web:4260b8038aae7eb90179f2",
  measurementId: "G-TY6SYJ6EYC"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firebase, firestore };