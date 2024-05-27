import React, { useEffect } from "react";
import { useStorageState } from "./useStorageState";
import { removeToken, setToken } from "@/src/api/api";
import { router } from "expo-router";
import { useMutation } from "react-query";
import { logoutRequest } from "@/src/api";

const AuthContext = React.createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const { mutate: onLogoutRequest } = useMutation(["logout"], logoutRequest);

  useEffect(() => {
    if (isLoading) return;
    if (session) {
      setToken(session);
      router.replace("/home");
    } else {
      removeToken();
      onLogoutRequest();
      router.replace("/login");
    }
  }, [session, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => setSession(token),
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
