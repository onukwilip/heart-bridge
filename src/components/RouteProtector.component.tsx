"use client";
import { useUserContext } from "@/contexts/User.context";
import React, { FC, ReactNode } from "react";
import error403image from "@/images/403-image.png";
import Image from "next/image";

const RouteProtector: FC<{
  children: ReactNode;
  role: "orphanage" | "donor";
}> = ({ children, role }) => {
  const { user, fetch_user_state } = useUserContext();

  if (!fetch_user_state.loading && user?.prefs?.account_type !== role) {
    return (
      <div className="w-full flex flex-col justify-center h-full items-center !text-white gap-3">
        <Image src={error403image.src} width={300} height={300} alt={"403"} />
        <span>You are not authorized to view this page</span>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteProtector;
