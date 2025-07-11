// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (User) => {
      if(!User){
        router.push('/auth/login'); // Redirect to login if not authenticated
      }else{
        setUser(User ?? null); // Set user state to the authenticated user or null
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, [router]);

  return { user, loading };
}
