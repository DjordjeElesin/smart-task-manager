import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

type FirebaseValueType = {
  analytics: Analytics;
  auth: Auth;
  firestoredb: Firestore;
  googleProvider: GoogleAuthProvider;
};

const auth = getAuth(app)

const firebaseValue: FirebaseValueType = {
  analytics: getAnalytics(app),
  auth: auth,
  firestoredb: getFirestore(app),
  googleProvider: new GoogleAuthProvider(),
};

export {auth}

const FirebaseContext = createContext<FirebaseValueType | null>(null);

const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FirebaseContext.Provider value={firebaseValue}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider, FirebaseContext };
