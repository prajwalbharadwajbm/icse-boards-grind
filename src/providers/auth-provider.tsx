"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, signOut, type User } from "firebase/auth";
import { getAuthInstance, getDbInstance } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { loadFromCloud, setCurrentUid, startSyncListener, stopSyncListener } from "@/store/firebase-sync";
import { useStore } from "@/store/use-store";
import { refreshCredits } from "@/hooks/use-credits";
import { capture, INTERNAL_EMAILS } from "@/lib/analytics";

const googleProvider = new GoogleAuthProvider();

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  login: async () => {},
  loginWithGoogle: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuthInstance(), async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUid(firebaseUser.uid);
        await loadFromCloud(firebaseUser.uid);
        // Server is the source of truth for credits; also gives new students their starting balance
        void refreshCredits();
        startSyncListener();
        if (firebaseUser.email) {
          setDoc(doc(getDbInstance(), "users", firebaseUser.uid), { email: firebaseUser.email }, { merge: true }).catch(() => {});
        }
        setUser(firebaseUser);
      } else {
        stopSyncListener();
        setCurrentUid(null);
        useStore.getState().resetStore();
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(getAuthInstance(), email, password);
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(getAuthInstance(), googleProvider);
    const email = result.user.email;
    if (getAdditionalUserInfo(result)?.isNewUser && !(email && INTERNAL_EMAILS.includes(email))) {
      capture("user_signed_up", { method: "google" });
    }
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(getAuthInstance(), email, password);
    if (!INTERNAL_EMAILS.includes(email)) capture("user_signed_up", { method: "email" });
  };

  const logout = async () => {
    capture("user_logged_out");
    await signOut(getAuthInstance());
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
