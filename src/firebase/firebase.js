// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfqEHlqj8Nzu4ud5uJbcSFqPM5DxN0zCg",
  authDomain: "group-study-review.firebaseapp.com",
  projectId: "group-study-review",
  storageBucket: "group-study-review.firebasestorage.app",
  messagingSenderId: "870036493763",
  appId: "1:870036493763:web:7d49317f695bab327f9976"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth