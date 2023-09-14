"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type MyComponentProps = {
  children: ReactNode;
};

export default function Provider({ children }: MyComponentProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
