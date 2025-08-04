"use client";

import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import FirebaseApp from "./";
import type { LoginModel } from "@/models/Login.model";

const auth = getAuth(FirebaseApp);

export default auth;

export function loginWithEmail(data: LoginModel) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function loginWithFacebook() {
  const provider = new FacebookAuthProvider();
  return signInWithPopup(auth, provider);
}
