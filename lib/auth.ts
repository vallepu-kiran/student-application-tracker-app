// // This is a mock authentication service
// // In a real application, this would connect to a backend service or auth provider

// import { getUserByEmail, createUser } from "@/lib/api";

// // Mock storage for authentication state
// let isAuthenticated = false;
// let currentUser: any = null;

// export async function signIn(email: string, password: string): Promise<boolean> {
//   try {
//     // In a real app, this would validate credentials against a backend
//     const user = await getUserByEmail(email);
    
//     if (user) {
//       // Mock successful authentication
//       isAuthenticated = true;
//       currentUser = user;
      
//       // Store auth state in localStorage for persistence
//       if (typeof window !== "undefined") {
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("currentUser", JSON.stringify(user));
//       }
      
//       return true;
//     }
    
//     return false;
//   } catch (error) {
//     console.error("Sign in error:", error);
//     return false;
//   }
// }

// export async function signUp(userData: any): Promise<boolean> {
//   try {
//     // In a real app, this would create a user in the backend
//     const newUser = await createUser(userData);
    
//     if (newUser) {
//       // Auto sign in after successful signup
//       isAuthenticated = true;
//       currentUser = newUser;
      
//       // Store auth state in localStorage for persistence
//       if (typeof window !== "undefined") {
//         localStorage.setItem("isAuthenticated", "true");
//         localStorage.setItem("currentUser", JSON.stringify(newUser));
//       }
      
//       return true;
//     }
    
//     return false;
//   } catch (error) {
//     console.error("Sign up error:", error);
//     return false;
//   }
// }

// export async function signOut(): Promise<void> {
//   // Clear authentication state
//   isAuthenticated = false;
//   currentUser = null;
  
//   // Clear localStorage
//   if (typeof window !== "undefined") {
//     localStorage.removeItem("isAuthenticated");
//     localStorage.removeItem("currentUser");
//   }
// }

// export function getAuthStatus(): boolean {
//   // Check localStorage for persistence across page refreshes
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("isAuthenticated") === "true";
//   }
  
//   return isAuthenticated;
// }

// export function getCurrentUser(): any {
//   // Get current user from localStorage for persistence
//   if (typeof window !== "undefined") {
//     const userJson = localStorage.getItem("currentUser");
//     if (userJson) {
//       return JSON.parse(userJson);
//     }
//   }
  
//   return currentUser;
// }


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

export async function signIn(email: string, password: string): Promise<boolean> {
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