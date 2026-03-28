"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, isFirebaseAuthConfigured } from "../firebase/firebaseConfig";
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    if (!isFirebaseAuthConfigured) {
      console.error(
        "Firebase auth is not configured. Add the public Vite Firebase variables before using Google sign-in."
      );
      return;
    }

    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      disabled={loading || !isFirebaseAuthConfigured}
      title={
        isFirebaseAuthConfigured
          ? "Continue with Google"
          : "Firebase auth is not configured yet."
      }
      className="px-4 py-2 w-full border border-[#EEEEEE]  flex items-center justify-center gap-[7px] text-[#201E43] rounded-md disabled:opacity-50"
    >
      <FcGoogle size={25} />
      <span>{loading ? "Signing in..." : "Google"}</span>
    </button>
  );
};

export default GoogleSignIn;
