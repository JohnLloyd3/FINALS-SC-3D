// Quick Firebase connectivity test
import { auth, database } from './config/firebase';
import { ref, get } from 'firebase/database';

export const testFirebaseConnection = async () => {
  console.log('Testing Firebase connection...');
  
  try {
    // Test database read
    console.log('Testing database read...');
    const testRef = ref(database, '/');
    const snapshot = await Promise.race([
      get(testRef),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
    ]);
    console.log('Database connection: SUCCESS');
    console.log('Database root exists:', snapshot.exists());
    
    // Test auth
    console.log('Auth object:', auth);
    console.log('Firebase tests completed!');
    
    return { success: true };
  } catch (error) {
    console.error('Firebase test failed:', error);
    return { success: false, error: error.message };
  }
};
