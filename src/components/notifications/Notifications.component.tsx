"use client";
import React, { FC, useEffect } from "react";
import Notification from "./Notification.component";
import { TNotification } from "@/utils/types";
import Link from "next/link";
import { useNotificationsContext } from "@/contexts/Notifications.context";
import Error404 from "../atoms/Error404.component";
import { Skeleton } from "@mui/material";

const dummy_notification: TNotification = {
  $id: "1",
  content: "Alex Emeto donated #150,000 to the Back to School project.",
  initiator_id: "kkmnn",
  orphanage_id: "knnjm",
  read: false,
  ref_ids: ["ldsd", "kkks"],
  type: "donation",
};

const Notifications: FC<{ expand?: boolean }> = ({ expand }) => {
  const {
    notifications,
    new_notifications,
    fetch_notifications_state,
    clear_new_notifications,
  } = useNotificationsContext();

  useEffect(() => {
    if (!expand) return;

    // * Clear the "new notifications" list if the user visits the notifications page
    const timeout = setTimeout(clear_new_notifications, 1 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className={`w-full max-w-[1000px] flex flex-col ${
        expand ? "p-4 gap-4" : "gap-2 p-2 rounded-lg bg-primary-dark "
      }`}
    >
      {/* Title */}
      <span>Notifications</span>
      {/* Notification list */}
      <div className={`w-full flex flex-col ${expand ? "gap-4" : "gap-2"}`}>
        {fetch_notifications_state.loading ? (
          <>
            {[1, 2, 3, 4, 5].map((_) => (
              <div className="w-full flex gap-6 items-center" key={_}>
                <Skeleton
                  variant="rounded"
                  animation="pulse"
                  width={70}
                  height={70}
                  className="!bg-primary-grey"
                />
                <div className="flex flex-col gap-0 flex-1">
                  <Skeleton
                    variant="text"
                    animation="pulse"
                    width={"100%"}
                    className="!bg-primary-grey"
                  />
                  <Skeleton
                    variant="text"
                    animation="pulse"
                    width={"80%"}
                    className="!bg-primary-grey"
                  />
                </div>
              </div>
            ))}
          </>
        ) : expand ? (
          notifications.length > 0 ? (
            [...notifications]
              .reverse()
              .map((notification, i) => (
                <Notification
                  notification={notification}
                  key={notification.$id}
                  expand={true}
                />
              ))
          ) : (
            <div>No notification</div>
          )
        ) : new_notifications.length > 0 ? (
          [...new_notifications]
            .reverse()
            .map((notification, i) => (
              <Notification
                notification={notification}
                key={notification.$id}
                expand={false}
              />
            ))
        ) : (
          <div>No new notification</div>
        )}
      </div>
      {!expand && (
        <Link
          href={"/dashboard/notifications"}
          className="cursor-pointer text-primary"
        >
          View all...
        </Link>
      )}
    </div>
  );
};

export default Notifications;
