import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth' 
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMHp395Zy0aQ_zWbON_EPUZpjDGLI4qeI",
  authDomain: "keyrecovery-f0fb1.firebaseapp.com",
  projectId: "keyrecovery-f0fb1",
  storageBucket: "keyrecovery-f0fb1.appspot.com",
  messagingSenderId: "128654217098",
  appId: "1:128654217098:web:e54ee3ea3ea277925e8273"
};

const app = initializeApp(firebaseConfig)
export const authentication = getAuth()
export const storage_db = getFirestore(app) 

