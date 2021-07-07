import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBvkIfqOyHJBh7wiOuAEx_vz2hDdHuCQRo",
    authDomain: "react-persistence-b64fc.firebaseapp.com",
    projectId: "react-persistence-b64fc",
    storageBucket: "react-persistence-b64fc.appspot.com",
    messagingSenderId: "703782216495",
    appId: "1:703782216495:web:b7cf871093531d2c5577da",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
