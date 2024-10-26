"use client";
import React, { useState } from "react";
import Notifications from "./Notifications.component";
import { useNotificationsContext } from "@/contexts/Notifications.context";

const HeaderNotification = () => {
  const [show_notifications, setShowNotifications] = useState(false);
  const { new_notifications, clear_new_notifications } =
    useNotificationsContext();

  return (
    <div
      className="xs:relative"
      onClick={() => {
        setShowNotifications((prev) => !prev);
        if (show_notifications) clear_new_notifications();
      }}
    >
      <i className="fa-regular fa-bell transition duration-200 hover:text-primary-grey-dark cursor-pointer"></i>
      {new_notifications.length > 0 && (
        <sup className="text-primary p-[4px] rounded bg-primary/15">
          {new_notifications.length}
        </sup>
      )}

      {show_notifications && (
        <div className="absolute top-20 w-[300px] right-2 xs:top-8 xs:-right-4 md:right-0 md:-left-24 z-30 ">
          <Notifications />
        </div>
      )}
    </div>
  );
};

export default HeaderNotification;
