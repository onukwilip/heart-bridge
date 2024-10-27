"use server";
import database from "@/utils/appwrite/node_appwrite_database.utils";
import {
  APPWRITE_DATABASE,
  TNotification,
  TNotificationDonationMetadata,
  TNotificationScheduleMetadata,
  TNotificationType,
} from "@/utils/types";
import { format_currency } from "@/utils/utils";
import { ID, Models } from "node-appwrite";

/**
 * * Function responsible for creating a new notification
 * @param config The ID of the orphanage, the type of notification, and other information
 */
export const add_notification = async ({
  user_id,
  ref_id,
  initiator_id,
  type,
  metadata,
}: {
  user_id: string;
  initiator_id?: string;
  type: TNotificationType;
  ref_id: string;
  metadata: TNotificationDonationMetadata & TNotificationScheduleMetadata;
}) => {
  try {
    const id = ID.unique();
    // * Add this donation to the donation collection
    await database.createDocument<Models.Document & TNotification>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.NOTIFICATIONS_COLLECTION_ID,
      id,
      {
        initiator_id,
        type: type,
        user_id,
        content:
          type === "donation"
            ? `
${metadata.donor_name || "An anonymous donor"} donated ${format_currency(
                Number(metadata.amount)
              )} to the ${metadata.project_title} project`
            : `${metadata.donor_name} scheduled a ${
                type === "call" ? "Zoom call" : "Visitation"
              } with you on the ${metadata.date} by ${metadata.time}`,
        ref_ids: [
          ref_id,
          ...(type === "donation"
            ? [
                metadata.donation_id,
                ...(metadata.orphanage_id ? [metadata.orphanage_id] : []),
              ]
            : []),
        ],
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error((error as any).message || error);
  }
};
