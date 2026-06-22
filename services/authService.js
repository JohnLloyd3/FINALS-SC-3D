import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, database } from "../config/firebase";

export const register = async (email, password, username) => {
  try {
    // 1. CHECK DUPLICATE EMAIL (Firebase Auth already handles email duplicate)
    // but we still check username manually in Realtime DB
    const snapshot = await get(ref(database, "users"));
    if (snapshot.exists()) {
      const users = snapshot.val();
      const usernameExists = Object.values(users).some((user) => user.username === username);
      if (usernameExists) {
        return {
          success: false,
          error: "Username or email already exists. Please choose a different one.",
        };
      }
    }

    // 2. CREATE USER IN FIREBASE AUTH
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 3. SAVE USER IN DATABASE
    await set(ref(database, "users/" + user.uid), {
      uid: user.uid,
      email,
      username,
    });

    return { success: true };
  } catch (error) {
    console.log("Register error:", error);
    // IMPORTANT: return error so UI stops loading
    return {
      success: false,
      error: error.message || "Registration failed",
    };
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.log("Login error:", error);
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }
};