import { useEffect, useState, type ReactNode } from "react";
import Cookies from "universal-cookie";

import type { Member } from "../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

interface ContextProviderProps {
  children: ReactNode;
}

const cookies = new Cookies();

const getInitialMember = (): Member | null => {
  try {
    const accessToken = cookies.get("accessToken");
    const memberData = localStorage.getItem("memberData");

    if (!accessToken || !memberData) {
      localStorage.removeItem("memberData");
      return null;
    }

    return JSON.parse(memberData) as Member;
  } catch (error) {
    console.error("Failed to load member data:", error);
    localStorage.removeItem("memberData");
    return null;
  }
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [authMember, setAuthMember] = useState<Member | null>(getInitialMember);

  useEffect(() => {
    if (authMember) {
      localStorage.setItem("memberData", JSON.stringify(authMember));
    } else {
      localStorage.removeItem("memberData");
    }
  }, [authMember]);

  return (
    <GlobalContext.Provider
      value={{
        authMember,
        setAuthMember,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
