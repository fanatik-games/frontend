import { AuthContext } from "@/providers/auth";
import { useContext } from "react";

export default function useAuth() {
  const session = useContext(AuthContext);

  return {
    session,
  };
}
