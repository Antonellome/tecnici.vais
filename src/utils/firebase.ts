import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'fake-api-key-for-preview',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'fake-auth-domain-for-preview',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'fake-project-id-for-preview',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'fake-storage-bucket-for-preview',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'fake-sender-id-for-preview',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'fake-app-id-for-preview',
};

let app: any;
let db: any;
let auth: any;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error("Errore fatale durante l'inizializzazione di Firebase:", error);
  // Fallback sicuro a livello di modulo per prevenire la schermata bianca
  app = {} as any;
  db = {} as any;
  auth = {
    currentUser: null,
    onAuthStateChanged: (authInstance: any, callback: any) => {
      // Invia subito stato non autenticato per sbloccare la pagina di Login
      if (typeof callback === 'function') {
        setTimeout(() => callback(null), 0);
      }
      return () => {};
    },
    signOut: async () => {},
  } as any;
}

export { app, db, auth };

