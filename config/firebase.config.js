import Firebase from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
    readFileSync(new URL('../drive-c7732-firebase-adminsdk-ugok5-b866cbdd80.json', import.meta.url))
);

const firebaseApp = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-c7732.appspot.com'
});

export default Firebase; // Export Firebase, not firebaseApp, to access `credential.cert`
