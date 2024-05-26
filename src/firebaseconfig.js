// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnyk8t4x4tQ4fSD2ktBXaAjhugm_eXlOM",
  authDomain: "auth-d6992.firebaseapp.com",
  projectId: "auth-d6992",
  storageBucket: "auth-d6992.appspot.com",
  messagingSenderId: "786288982752",
  appId: "1:786288982752:web:0b2b8139e5458227e22e85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
