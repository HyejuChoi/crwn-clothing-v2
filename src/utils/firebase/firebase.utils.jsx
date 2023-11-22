import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCyOGlcK1Gu6yRI8lBI8jpjx0k15HfiBCA",
    authDomain: "crwn-db-a8796.firebaseapp.com",
    projectId: "crwn-db-a8796",
    storageBucket: "crwn-db-a8796.appspot.com",
    messagingSenderId: "901338385467",
    appId: "1:901338385467:web:a55117bb0aaa6e64d5e01e"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);