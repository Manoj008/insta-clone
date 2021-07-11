import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import seed file
// import { seedDatabase } from '../seed';



var firebaseConfig = {
    apiKey: "AIzaSyDIES6lKwkUkjAZuMEhiuAlaRa9kC9jPKE",
    authDomain: "insta-clone-c2d1c.firebaseapp.com",
    projectId: "insta-clone-c2d1c",
    storageBucket: "insta-clone-c2d1c.appspot.com",
    messagingSenderId: "231328841992",
    appId: "1:231328841992:web:f8e74bad7569702891acbd",
    measurementId: "G-1VNYZLXMZW"
};

const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;

//here seed file is called only once
// seedDatabase(firebase);


export { firebase, FieldValue };
