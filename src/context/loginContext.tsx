"use client";

import { createContext, useState, useContext } from "react";
import { User, Session, LoginContextProviderProps } from "@/types/types";
import { initialUser, initialSession } from "@/types/initialStates";

interface LoginContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  session: Session;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
}

export const LoginContext = createContext<LoginContext | null>(null);

export default function LoginContextProvider({
  children,
}: LoginContextProviderProps) {

  const initialUserl = JSON.parse(localStorage.getItem('user')) || null;
  const initialSession = JSON.parse(localStorage.getItem('session')) || null;
  const [user, setUser] = useState<User>(initialUser);
  const [session, setSession] = useState<Session>(initialSession);

  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
        session,
        setSession,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      "Se está intentando usar LoginContext fuera de de LoginContectProvider"
    );
  }
  return context
}
