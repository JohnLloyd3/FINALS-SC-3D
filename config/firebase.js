import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Suppress Firebase database warnings in development
if (__DEV__) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('@firebase/database') ||
       args[0].includes('FIREBASE WARNING'))
    ) {
      // Silently ignore Firebase database warnings
      return;
    }
    originalWarn(...args);
  };
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkw0usUpu0mqb5YTX3LGRMjfcMaeU3i_U",
  authDomain: "lloydii.firebaseapp.com",
  databaseURL: "https://lloydii-default-rtdb.firebaseio.com",
  projectId: "lloydii",
  storageBucket: "lloydii.firebasestorage.app",
  messagingSenderId: "435489351037",
  appId: "1:435489351037:web:d399eeb2efa3494317d814",
  measurementId: "G-S46GSJX64E"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('[FIREBASE] ✅ App initialized successfully');
} catch (error) {
  console.error('[FIREBASE] ❌ Error initializing app:', error);
  throw error;
}

// Initialize Authentication with AsyncStorage persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log('[FIREBASE] ✅ Auth initialized successfully');
} catch (error) {
  // If auth already exists, get it
  auth = getAuth(app);
  console.log('[FIREBASE] ✅ Auth instance retrieved');
}

// Initialize Realtime Database (will use local storage if database not created yet)
let database = null;
try {
  database = getDatabase(app);
  console.log('[FIREBASE] ✅ Database reference created');
  console.log('[FIREBASE] ℹ️  Using local storage until Firebase Database is set up');
} catch (error) {
  console.log('[FIREBASE] ℹ️  Database will use local storage only');
  database = null;
}

export { auth, database };

export default app;
