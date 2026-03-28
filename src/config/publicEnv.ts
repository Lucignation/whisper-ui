const readPublicValue = (...values: Array<string | undefined>) => {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return "";
};

export const firebasePublicConfig = {
  apiKey: readPublicValue(
    import.meta.env.VITE_FB_WEB_KEY,
    import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY
  ),
  authDomain: readPublicValue(
    import.meta.env.VITE_FB_APP_DOMAIN,
    import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN
  ),
  projectId: readPublicValue(
    import.meta.env.VITE_FB_PROJECT_ID,
    import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID
  ),
  storageBucket: readPublicValue(
    import.meta.env.VITE_FB_STORAGE_BUCKET,
    import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET
  ),
  messagingSenderId: readPublicValue(
    import.meta.env.VITE_FB_SENDER_ID,
    import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  ),
  appId: readPublicValue(
    import.meta.env.VITE_FB_APP_ID,
    import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID
  ),
  measurementId: readPublicValue(
    import.meta.env.VITE_FB_MEASUREMENT_ID,
    import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID
  ),
} as const;

const requiredFirebasePublicEnv = [
  ["VITE_FB_WEB_KEY", firebasePublicConfig.apiKey],
  ["VITE_FB_APP_DOMAIN", firebasePublicConfig.authDomain],
  ["VITE_FB_PROJECT_ID", firebasePublicConfig.projectId],
  ["VITE_FB_STORAGE_BUCKET", firebasePublicConfig.storageBucket],
  ["VITE_FB_SENDER_ID", firebasePublicConfig.messagingSenderId],
  ["VITE_FB_APP_ID", firebasePublicConfig.appId],
] as const;

export const missingFirebasePublicEnv = requiredFirebasePublicEnv
  .filter(([, value]) => !value)
  .map(([name]) => name);

export const isFirebasePublicConfigComplete =
  missingFirebasePublicEnv.length === 0;

export const usesLegacyFirebaseEnvNames = [
  import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
  import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
  import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
  import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
  import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID,
].some(Boolean);
