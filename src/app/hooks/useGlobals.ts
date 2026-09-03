import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { Member } from "../lib/types/member";

interface GlobalContextValue {
  authMember: Member | null;
  setAuthMember: Dispatch<SetStateAction<Member | null>>;
}

export const GlobalContext = createContext<GlobalContextValue | undefined>(
  undefined,
);

export const useGlobals = (): GlobalContextValue => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("useGlobals must be used inside ContextProvider");
  }

  return context;
};
