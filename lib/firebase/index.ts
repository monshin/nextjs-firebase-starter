"use client";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

/* Initialize */
const app = initializeApp({
  apiKey: 'AIzaSyCJnu59PvcjOnz2iuVXY_Ul_3byQjS9ypU',
  authDomain: 'bc3ts-ce4dd.firebaseapp.com',
  databaseURL: 'https://bc3ts-ce4dd.firebaseio.com',
  projectId: 'bc3ts-ce4dd',
  storageBucket: 'img.bc3ts.net',
  messagingSenderId: '938250765232',
  appId: '1:938250765232:web:ed2fc6da6d1c1b50',
  measurementId: 'G-SKD15X18CN',
});

export default app;

export const FirebaseStorage = getStorage(app);
