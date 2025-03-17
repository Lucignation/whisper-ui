"use client";

import { useState } from "react";
import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { TfiMicrosoftAlt } from "react-icons/tfi";

const MicrosoftSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithMicrosoft = async () => {
    const provider = new OAuthProvider("microsoft.com");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Microsoft Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={signInWithMicrosoft}
      disabled={loading}
      className="px-4 py-2 w-full border border-[#EEEEEE]  flex items-center justify-center gap-[7px] text-[#201E43] rounded-md disabled:opacity-50"
    >
      <TfiMicrosoftAlt />
      <span>{loading ? "Signing in..." : "Microsoft"}</span>
    </button>
  );
};

export default MicrosoftSignIn;
