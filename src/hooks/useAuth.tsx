import { AuthContext } from "@/providers/auth";
import { useContext } from "react";

export default function useAuth() {
  const context = useContext(AuthContext);

  return {
    session: context?.session,
    isAuthenticating: context?.isAuthenticating,
  };
}
