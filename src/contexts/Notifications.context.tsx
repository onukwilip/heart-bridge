"use client";
import useFetch from "@/hooks/useFetch.hook";
import {
  APPWRITE_DATABASE,
  TNotification,
  TNotificationDoc,
} from "@/utils/types";
import { Models, Query } from "appwrite";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import database from "@/utils/appwrite/appwrite_database.utils";
import { useUserContext } from "./User.context";
import client from "@/utils/appwrite/appwrite_client.utils";

// * The notification context
const NotificationContext = createContext<{
  notifications: TNotificationDoc[];
  new_notifications: TNotificationDoc[];
  populate_notifications: () => Promise<void>;
  refresh_notifications: () => Promise<void>;
  read_notification: (notification_id: string) => Promise<void>;
  clear_new_notifications: () => void;
  fetch_notifications_state: {
    error: string | undefined;
    loading: boolean;
    success: string | undefined;
  };
}>({
  notifications: [],
  new_notifications: [],
  populate_notifications: async () => {},
  refresh_notifications: async () => {},
  read_notification: async () => {},
  clear_new_notifications: () => {},
  fetch_notifications_state: {
    error: undefined,
    loading: false,
    success: undefined,
  },
});

/**
 * * The notifications context provider component
 * @returns The notifications context provider
 */
const NotificationsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<TNotificationDoc[]>([]);
  const { user, fetch_user_state } = useUserContext();
  const fetch_notifications_state = useFetch({ loading: true });
  const [new_notifications, setNewNotifications] = useState<TNotificationDoc[]>(
    []
  );

  /**
   * * Function responsible for adding a notification the list of existing notifications
   * @param new_notification The new notification to be added to the list of existing notifications
   */
  const add_new_notification = (new_notification: TNotificationDoc) => {
    // * Check if the notification is already in the list of existing "new notifications", and adds if it's not
    setNewNotifications((prev_new_notifications) => [
      ...prev_new_notifications,
      ...(prev_new_notifications.find(
        (prev_new_notification) =>
          prev_new_notification.$id === new_notification.$id
      )
        ? []
        : [new_notification]),
    ]);
    // * Check if the notification is already in the list of existing notifications, and adds if it's not
    setNotifications((prev_notifications) => [
      ...prev_notifications,
      ...(prev_notifications.find(
        (prev_notification) => prev_notification.$id === new_notification.$id
      )
        ? []
        : [new_notification]),
    ]);
  };

  /**
   * * Function responsible for updating the status of a notification in the list of existing notifications
   * @param notification_id The Id of the notification to be marked as read.
   */
  const update_notification_status = (notification_id: string) => {
    // * Retrieve the old and new notifications from the state
    const old_notifications = [...notifications];
    const old_new_notifications = [...new_notifications];

    // * Retrieve the index of the notification whose status was changed to read
    const old_notification_index = old_notifications.findIndex(
      (notification) => notification.$id === notification_id
    );
    const old_new_notification_index = old_new_notifications.findIndex(
      (notification) => notification.$id === notification_id
    );

    // * if the notification exists, updates it's status to read
    if (old_notification_index >= 0) {
      old_notifications[old_notification_index].read = true;
      setNotifications([...old_notifications]);
    }

    if (old_new_notification_index >= 0) {
      old_new_notifications[old_new_notification_index].read = true;
      setNewNotifications([...old_new_notifications]);
    }
  };

  /**
   * * Function responsible for updating the status of a notification as 'read' in the collection of notifications
   * @param notification_id The Id of the notification to be marked as read.
   */
  const read_notification = async (notification_id: string) => {
    // * Update the notification status to 'read' in the database
    await database.updateDocument(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.NOTIFICATIONS_COLLECTION_ID,
      notification_id,
      {
        read: true,
      }
    );

    // * Update the notification in the notifications list
    update_notification_status(notification_id);
  };

  /**
   * * Function responsible for clearing all new notifications
   */
  const clear_new_notifications = () => {
    setNewNotifications([]);
  };

  /**
   * * Retrieves the notifications details from the cookies and populates the notifications stte with it
   */
  const populate_notifications = async () => {
    // * Indicate that the context is retrieving the notifications details
    fetch_notifications_state.display_loading();

    // * Retrieve user notifications from Appwrite API
    const notifications = await database
      .listDocuments<Models.Document & TNotification>(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.NOTIFICATIONS_COLLECTION_ID,
        [Query.equal("user_id", user?.$id || "")]
      )
      .catch((e) => fetch_notifications_state.display_error(e.message));

    // * If notifications not found, display an error message
    if (!notifications) {
      return fetch_notifications_state.display_error("Notifications not found");
    }

    // * Set the notifications in the state and display a success message
    setNotifications(notifications.documents);
    fetch_notifications_state.display_success("Success");
  };

  /**
   * * Retrieves the notifications details from the Appwrite API and updates the notifications state with it
   */
  const refresh_notifications = async () => {
    const new_notifications_details = await database.listDocuments<
      Models.Document & TNotification
    >(APPWRITE_DATABASE.DB_ID, APPWRITE_DATABASE.NOTIFICATIONS_COLLECTION_ID, [
      Query.equal(
        user?.prefs?.account_type === "orphanage"
          ? "orphanage_id"
          : "initiator_id",
        user?.$id || ""
      ),
    ]);
    if (!new_notifications_details) return;
    setNotifications(new_notifications_details.documents);
  };

  /**
   * * Subscribes to the Appwrite notification collection in order to receive realtime notifications
   * @returns The Appwrite's unsubscribe function
   */
  const subscribe_to_notifications = () => {
    const channel = `databases.${APPWRITE_DATABASE.DB_ID}.collections.${APPWRITE_DATABASE.NOTIFICATIONS_COLLECTION_ID}.documents`;
    return client.subscribe<TNotificationDoc>(
      channel,
      ({ events, payload }) => {
        try {
          const is_create = events[0].includes("create");

          if (is_create && payload.user_id === user?.$id) {
            add_new_notification(payload);
          }
        } catch (error) {
          console.error("REALTIME ERROR", error);
        } finally {
          // console.log("EVENTS", events, payload);
        }
      }
    );
  };

  useEffect(() => {
    if (!user) return;
    populate_notifications();
    const unsubscribe = subscribe_to_notifications();

    return () => {
      unsubscribe && unsubscribe();
      console.log("UNSUBSCRIBED");
    };
  }, [fetch_user_state.loading]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        new_notifications,
        fetch_notifications_state,
        populate_notifications,
        read_notification,
        clear_new_notifications,
        refresh_notifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * * Hook responsible for retrieving the notifications context values
 * @returns The notifications context values
 */
export const useNotificationsContext = () => {
  const context = useContext(NotificationContext);

  if (!context)
    throw new Error(
      "Component needs to be wrapped in the Notifications context provider"
    );
  return context;
};

export default NotificationsContextProvider;
