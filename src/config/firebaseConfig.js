import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBv-6he4pQPjPF2DOLFZOkBW5ivBAlLx4s",
  authDomain: "netflix-copy-aa6e6.firebaseapp.com",
  projectId: "netflix-copy-aa6e6",
  storageBucket: "netflix-copy-aa6e6.firebasestorage.app",
  messagingSenderId: "368599543479",
  appId: "1:368599543479:web:a5c2acb26462f12efd2732",
  measurementId: "G-WL3P03PDQH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const googleProvider = new GoogleAuthProvider();

const handleGoogleSignup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });
    }

    console.log("Google Sign-Up successful:", user);
  } catch (error) {
    console.error("Error signing up with Google:", error.message);
  }
};

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log("Google Login successful:", user);
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
  }
};

export { auth, db, googleProvider, handleGoogleSignup, handleGoogleLogin };