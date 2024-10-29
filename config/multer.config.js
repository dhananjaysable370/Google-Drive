import multer from 'multer';
import firebaseStorage from 'multer-firebase-storage';
import Firebase from './firebase.config.js'; // Import Firebase (not the app instance)
import { readFileSync } from 'fs';

// Load service account JSON
const serviceAccount = JSON.parse(
    readFileSync(new URL('../drive-c7732-firebase-adminsdk-ugok5-b866cbdd80.json', import.meta.url))
);

// Define storage
const storage = firebaseStorage({
    credentials: Firebase.credential.cert(serviceAccount), // Use Firebase.credential
    bucketName: 'drive-c7732.appspot.com',
    unique:true
});

const upload = multer({
    storage: storage
});

export default upload;
