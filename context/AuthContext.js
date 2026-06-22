import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log('[AUTH] User authenticated:', authUser.uid);
        
        let profileLoaded = false;
        
        // Try to load from AsyncStorage first (fast)
        try {
          const cachedProfile = await AsyncStorage.getItem('userProfile');
          if (cachedProfile) {
            const parsed = JSON.parse(cachedProfile);
            console.log('[AUTH] Loaded profile from cache:', parsed);
            setUserProfile(parsed);
            profileLoaded = true;
          }
        } catch (err) {
          console.warn('[AUTH] Failed to load from cache:', err);
        }
        
        // Try to fetch from Firebase Database (may be slow/fail)
        try {
          const userRef = ref(database, `users/${authUser.uid}`);
          const snapshot = await Promise.race([
            get(userRef),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Firebase timeout')), 3000)
            )
          ]);
          
          if (snapshot.exists()) {
            const profile = snapshot.val();
            console.log('[AUTH] ✅ Loaded profile from Firebase:', profile);
            setUserProfile(profile);
            await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
            profileLoaded = true;
          }
        } catch (err) {
          // Silent failure for timeout
          if (!profileLoaded && err.message !== 'Firebase timeout') {
            console.warn('[AUTH] Firebase fetch error:', err.message);
          }
          // Silent failure if we already have cached data
        }
        
        // If no profile loaded from cache or Firebase, create basic profile
        if (!profileLoaded) {
          console.log('[AUTH] No profile found anywhere, creating basic profile');
          const basicProfile = {
            uid: authUser.uid,
            email: authUser.email,
            username: authUser.email?.split('@')[0] || 'User',
            fullName: authUser.email?.split('@')[0] || 'User',
            createdAt: new Date().toISOString(),
          };
          console.log('[AUTH] Using basic profile:', basicProfile);
          setUserProfile(basicProfile);
          await AsyncStorage.setItem('userProfile', JSON.stringify(basicProfile));
        }
      } else {
        setUser(null);
        setUserProfile(null);
        await AsyncStorage.removeItem('userProfile');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password, username) => {
    console.log('[AUTH] Register started:', { email, username });
    setLoading(true);
    setError(null);

    try {
      // Validate inputs
      console.log('[AUTH] Validating inputs...');
      if (!email || !password || !username) {
        const errorMsg = 'Please fill in all required fields.';
        console.log('[AUTH] Validation failed:', errorMsg);
        setError(errorMsg);
        setLoading(false);
        return { success: false, error: errorMsg };
      }

      // Check if username is unique with shorter timeout
      console.log('[AUTH] Checking username uniqueness...');
      try {
        const usernamesRef = ref(database, 'usernames');
        
        // Reduced timeout to 3 seconds
        const usernameCheckPromise = get(usernamesRef);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 3000)
        );
        
        const usernamesSnapshot = await Promise.race([usernameCheckPromise, timeoutPromise]);
        console.log('[AUTH] Username check completed');

        if (usernamesSnapshot.exists()) {
          const existingUsernames = usernamesSnapshot.val();
          if (existingUsernames && existingUsernames[username]) {
            const errorMsg = 'Username or email already exists. Please choose a different one.';
            console.log('[AUTH] Username exists:', username);
            setError(errorMsg);
            setLoading(false);
            return { success: false, error: errorMsg };
          }
        }
      } catch (usernameError) {
        // Silent failure for timeout
        if (usernameError.message !== 'Firebase timeout') {
          console.log('[AUTH] Username check error:', usernameError.message);
        }
        // Continue with registration even if username check fails
      }

      // Create authentication user with timeout
      console.log('[AUTH] Creating Firebase Auth user...');
      const authPromise = createUserWithEmailAndPassword(auth, email, password);
      const authTimeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Authentication timeout. Please check your connection.')), 10000)
      );
      
      const userCredential = await Promise.race([authPromise, authTimeoutPromise]);
      const uid = userCredential.user.uid;
      console.log('[AUTH] User created successfully:', uid);

      // Create user profile in database
      const userData = {
        uid,
        email,
        username,
        createdAt: new Date().toISOString(),
        orders: {},
        favorites: {},
      };

      console.log('[AUTH] Saving user data to database...');
      try {
        const savePromise = Promise.all([
          set(ref(database, `users/${uid}`), userData),
          set(ref(database, `usernames/${username}`), uid)
        ]);
        const saveTimeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 3000)
        );
        
        await Promise.race([savePromise, saveTimeout]);
        console.log('[AUTH] User data saved successfully');
      } catch (saveError) {
        // Silent failure for timeout
        if (saveError.message !== 'Firebase timeout') {
          console.log('[AUTH] Database save error:', saveError.message);
        }
        // Continue anyway since auth user was created
      }

      setUserProfile(userData);
      await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
      setLoading(false);
      console.log('[AUTH] Registration completed successfully');
      return { success: true, user: userCredential.user };
    } catch (err) {
      console.log('[AUTH] Registration error:', err);
      console.log('[AUTH] Error code:', err.code);
      console.log('[AUTH] Error message:', err.message);
      
      let errorMessage = 'Registration failed. Please try again.';

      if (err.message === 'Request timeout' || err.message.includes('timeout')) {
        errorMessage = 'Connection timeout. Please check your internet and try again.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please login or use a different email.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMessage = 'Account creation is currently disabled. Please try again later.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.log('[AUTH] Final error message:', errorMessage);
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (err) {
      let errorMessage;
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        errorMessage = 'Incorrect email or password.';
      } else {
        errorMessage = err.message;
      }
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUserProfile(null);
      await AsyncStorage.removeItem('userProfile');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      console.log('[UPDATE PROFILE] Starting update for user:', user.uid);
      console.log('[UPDATE PROFILE] Current userProfile:', userProfile);
      console.log('[UPDATE PROFILE] Updates:', updates);
      
      const updatedProfile = { ...userProfile, ...updates };
      console.log('[UPDATE PROFILE] Updated profile:', updatedProfile);
      
      // Save to Firebase Database with timeout (blocking this time)
      const userRef = ref(database, `users/${user.uid}`);
      try {
        await Promise.race([
          set(userRef, updatedProfile),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Firebase timeout')), 5000)
          )
        ]);
        console.log('[UPDATE PROFILE] Successfully saved to Firebase Database');
      } catch (dbError) {
        // Silent failure for timeout
        if (dbError.message !== 'Firebase timeout') {
          console.warn('[UPDATE PROFILE] Firebase error:', dbError.message);
        }
        console.warn('[UPDATE PROFILE] Profile saved locally only');
        // Continue anyway - at least save locally
      }
      
      // Update local state and cache
      setUserProfile(updatedProfile);
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      console.log('[UPDATE PROFILE] Profile updated successfully (local cache)');
      
      return { success: true, message: 'Profile updated successfully' };
    } catch (err) {
      console.error('[UPDATE PROFILE] Error:', err);
      return { success: false, error: err.message || 'Failed to update profile' };
    }
  };

  const sendReset = async (email) => {
    try {
      setError(null);
      // Send password reset email without custom action code settings
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      const errorMessage = err.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : err.code === 'auth/invalid-email'
        ? 'Please enter a valid email address'
        : err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const confirmReset = async (code, newPassword) => {
    try {
      setError(null);
      await confirmPasswordReset(auth, code, newPassword);
      return { success: true };
    } catch (err) {
      const errorMessage = err.code === 'auth/expired-action-code'
        ? 'The reset code has expired. Please request a new one.'
        : err.code === 'auth/invalid-action-code'
        ? 'The reset code is invalid. Please check it and try again.'
        : err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    auth,
    register,
    login,
    logout,
    updateUserProfile,
    sendReset,
    confirmReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
