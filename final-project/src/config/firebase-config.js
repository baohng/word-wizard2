// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'; // Import storage module

const firebaseConfig = {
  apiKey: "AIzaSyDp0ZWITDwUGVFZjcS3yhnSh_elAzCKGiQ",
  authDomain: "image-storage-ww.firebaseapp.com",
  projectId: "image-storage-ww",
  storageBucket: "image-storage-ww.appspot.com",
  messagingSenderId: "988028966392",
  appId: "1:988028966392:web:6107628d834ec317b6f20d"
};
// Initialize Firebase with the Firebase configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
export const storage = getStorage(app);