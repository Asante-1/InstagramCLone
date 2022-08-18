import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
// import { seedDatabase } from '../seed';



const config = {
    apiKey: "AIzaSyC1GTWlkG06onlMLRb3KD8mPV6DAsW1hRM",
    authDomain: "instaclone-f4e10.firebaseapp.com",
    projectId: "instaclone-f4e10",
    storageBucket: "instaclone-f4e10.appspot.com",
    messagingSenderId: "188154720401",
    appId: "1:188154720401:web:bbe1c4e9eeade1f71a0f30"
};

const firebaseapp = firebase.initializeApp(config)
const {FieldValue} = firebase.firestore;
const auth = firebase.auth()
const storage = firebase.storage()

// here is where i called the seed file only once
// seedDatabase(firebaseapp);


export { firebaseapp , FieldValue, auth , storage};