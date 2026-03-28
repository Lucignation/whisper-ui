import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  firebasePublicConfig,
  isFirebasePublicConfigComplete,
  missingFirebasePublicEnv,
  usesLegacyFirebaseEnvNames,
} from "../config/publicEnv";

// Firebase web config is intentionally public in the browser.
// Protect data with Firebase Auth, Security Rules, IAM, and App Check.
if (import.meta.env.DEV && usesLegacyFirebaseEnvNames) {
  console.info(
    "Using legacy Firebase public env names. Prefer the VITE_FB_* names from .env.example going forward."
  );
}

if (import.meta.env.DEV && !isFirebasePublicConfigComplete) {
  console.warn(
    `Firebase public config is incomplete. Missing: ${missingFirebasePublicEnv.join(", ")}`
  );
}

// Initialize Firebase
const app = initializeApp(firebasePublicConfig);
export const auth = getAuth(app);
export const isFirebaseAuthConfigured = isFirebasePublicConfigComplete;
