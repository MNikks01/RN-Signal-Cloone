import firebase from 'firebase';
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBSBoKo3hrbE5Pr9ZFrhRiCtDyh-pd9JaE",
    authDomain: "signal-clone-ed538.firebaseapp.com",
    projectId: "signal-clone-ed538",
    storageBucket: "signal-clone-ed538.appspot.com",
    messagingSenderId: "398195887087",
    appId: "1:398195887087:web:e111d80a680a834512841a"
});

const dB = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();


export { storage, auth };
export default dB;

// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyBSBoKo3hrbE5Pr9ZFrhRiCtDyh-pd9JaE",
//     authDomain: "signal-clone-ed538.firebaseapp.com",
//     projectId: "signal-clone-ed538",
//     storageBucket: "signal-clone-ed538.appspot.com",
//     messagingSenderId: "398195887087",
//     appId: "1:398195887087:web:e111d80a680a834512841a"
// };

// initializeApp(firebaseConfig)
