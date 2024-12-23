import { useNotificationsContext } from "@/contexts/Notifications.context";
import { useUserContext } from "@/contexts/User.context";
import { TNotificationDoc } from "@/utils/types";
import { get_timelapse } from "@/utils/utils";
import Link from "next/link";
import React, { FC } from "react";

const Notification: FC<{ notification: TNotificationDoc; expand: boolean }> = ({
  notification,
  expand,
}) => {
  const { read_notification } = useNotificationsContext();
  const { user } = useUserContext();

  const link = `${
    notification.type === "donation"
      ? user?.prefs.account_type === "orphanage"
        ? "/dashboard/projects"
        : `/orphanages/${notification.ref_ids[2]}`
      : notification.type === "visitation"
      ? "/dashboard/visitations"
      : notification.type === "call"
      ? "/dashboard/calls"
      : ""
  }/${
    notification.type === "donation"
      ? user?.prefs.account_type === "orphanage"
        ? `/${notification.ref_ids[0]}/#${notification.ref_ids[1]}`
        : `?project=${notification.ref_ids[0]}`
      : notification.type === "visitation"
      ? `#${notification.ref_ids[0]}`
      : notification.type === "call"
      ? `#${notification.ref_ids[0]}`
      : ""
  }`;

  return (
    <Link
      onClick={async () => await read_notification(notification.$id)}
      className={`w-full p-3 flex gap-4 justify-between rounded ${
        !notification.read ? "bg-primary/15" : "bg-container-dark"
      } items-center !text-sm cursor-pointer transition hover:scale-105`}
      href={link}
    >
      {/* Ion + content */}
      <div className="w-full flex gap-4 items-center">
        {/* Icon container */}
        <div
          className={`flex p-3 items-center justify-center rounded-sm ${
            notification.type === "donation"
              ? "bg-green-500/15"
              : notification.type === "visitation"
              ? "bg-yellow-500/15"
              : notification.type === "call"
              ? "bg-primary/15"
              : "bg-green-500/15"
          }`}
        >
          <i
            className={`block font-thin ${
              notification.type === "donation"
                ? "fas fa-dollar-sign text-green-500"
                : notification.type === "visitation"
                ? "fas fa-location-dot text-yellow-500"
                : notification.type === "call"
                ? "fas fa-mobile-screen text-primary"
                : "fas fa-dollar-sign text-green-500"
            }`}
          ></i>
        </div>
        {/* Content */}
        <div>
          {expand
            ? notification.content
            : `${notification.content.slice(0, 50)}...`}
        </div>
      </div>
      {/* Timelapse */}
      <div>{get_timelapse(notification.$createdAt)}</div>
    </Link>
  );
};

export default Notification;
