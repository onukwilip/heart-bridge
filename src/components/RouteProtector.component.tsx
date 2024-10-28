"use client";
import { useUserContext } from "@/contexts/User.context";
import React, { FC, ReactNode } from "react";
import Error403 from "./atoms/Error403.component";

/**
 * * Component responsible for protecting routes/other components, restricting children components to users with certain roles
 * @param param0 The object containing the component children and the user role permittd to view it's children
 * @returns JSX Component
 */
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
