const firebaseConfig = {
    apiKey: "AIzaSyCATzaLeeUkjSEyfl9NvmD1pHanNwVfb2I",
    authDomain: "mano-w.firebaseapp.com",
    projectId: "mano-w",
    storageBucket: "mano-w.appspot.com",
    messagingSenderId: "942729698790",
    appId: "1:942729698790:web:0fbfbb6ecc12a9c0280a27",
    measurementId: "G-PFYWB6H5EL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const userRef = db.collection('users');