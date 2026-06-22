import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
const app = initializeApp(firebaseConfig);

// Initialize Authentication with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Realtime Database with explicit URL
export const database = getDatabase(app, "https://lloydii-default-rtdb.firebaseio.com/");

export default app;
