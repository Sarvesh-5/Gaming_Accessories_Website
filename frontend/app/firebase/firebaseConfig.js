// app/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0c-oyMKjjfbntr-7B-_BMdCPo4TVwJvw",
  authDomain: "gg-lootbox.firebaseapp.com",
  projectId: "gg-lootbox",
  storageBucket: "gg-lootbox.firebasestorage.app",
  messagingSenderId: "1071821560067",
  appId: "1:1071821560067:web:9a080725684400ea33f136",
  measurementId: "G-HCEW9S6XS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
