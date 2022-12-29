import { AuthContext, IAuthContext } from "@/contexts";
import { useContext } from "react";

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
