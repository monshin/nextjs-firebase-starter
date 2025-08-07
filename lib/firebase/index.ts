'use client';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import firebaseInitJson from '@/firebase.json';

/* Initialize */
const app = initializeApp(firebaseInitJson);

export default app;

export const FirebaseStorage = getStorage(app);
