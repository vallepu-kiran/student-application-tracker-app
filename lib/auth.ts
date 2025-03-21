import { useEffect, useState } from "react";
import { getUserByEmail } from "./api";

let isAuthenticated = false;
let currentUser: any = null;

export function useAuth() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    currentUser: null,
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userJson = localStorage.getItem("currentUser");
    const currentUser = userJson ? JSON.parse(userJson) : null;

    setAuthState({ isAuthenticated, currentUser });
  }, []);

  return authState;
}

export async function signIn(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const user = await getUserByEmail(email);

    if (user) {
      isAuthenticated = true;
      currentUser = user;

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
  isAuthenticated = false;
  currentUser = null;

  if (typeof window !== "undefined") {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
  }
}
