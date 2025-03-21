import { useEffect, useState } from "react";
import { getUserByEmail } from "./api";
import { UserData } from "@/lib/types";

export function useAuth() {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    currentUser: UserData | null;
  }>({
    isAuthenticated: false,
    currentUser: null,
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userJson = localStorage.getItem("currentUser");
    const currentUser: UserData | null = userJson ? JSON.parse(userJson) : null;

    setAuthState({ isAuthenticated, currentUser });
  }, []);

  return authState;
}

export async function signIn(email: string): Promise<boolean> {
  try {
    const user = await getUserByEmail(email);

    if (user) {
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error("Sign in error:", error);
    return false;
  }
}

export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
  }
}
