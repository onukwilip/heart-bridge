"use client";
import { useUserContext } from "@/contexts/User.context";
import React, { FC, ReactNode } from "react";
import Error403 from "./atoms/Error403.component";

const RouteProtector: FC<{
  children: ReactNode;
  role: "orphanage" | "donor";
}> = ({ children, role }) => {
  const { user, fetch_user_state } = useUserContext();

  if (!fetch_user_state.loading && user?.prefs?.account_type !== role) {
    return <Error403 />;
  }

  return <>{children}</>;
};

export default RouteProtector;
