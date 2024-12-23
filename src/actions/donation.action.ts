"use server";
import database from "@/utils/appwrite/node_appwrite_database.utils";
import users from "@/utils/appwrite/node_appwrite_users.utils";
import {
  APPWRITE_DATABASE,
  TDonation,
  TNotificationDonationMetadata,
  TNotificationScheduleMetadata,
  TProject,
  TUser,
  TUserRoles,
} from "@/utils/types";
import { ID, Models, Query } from "node-appwrite";
import { add_notification } from "./notification.action";

/**
 * * Function responsible for creating a new donation
 * @param config The ID of the orphanage, and project to donated to, the id of the donor, the amount donated, and any comment made
 */
export const add_donation = async ({
  orphanage_id,
  project_id,
  comment,
  donor_id,
  amount,
  notification_metadata,
}: {
  orphanage_id: string;
  project_id: string;
  comment?: string;
  donor_id?: string;
  amount: string;
  notification_metadata: TNotificationDonationMetadata;
}) => {
  try {
    const donation_id = ID.unique();
    // * Add this donation to the donation collection
    await database.createDocument<Models.Document & TDonation>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.DONATIONS_COLLECTION_ID,
      ID.unique(),
      { orphanage_id, project: project_id, comment, donor: donor_id, amount }
    );

    // * Get the details of the project
    const project_details = await database.getDocument<
      Models.Document & TProject
    >(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
      project_id
    );

    // * Update the projects' current amount
    await database.updateDocument(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
      project_id,
      {
        current_amount: Number(project_details.current_amount) + Number(amount),
      }
    );

    // * Notify the orphanage of this donation
    await add_notification({
      user_id: orphanage_id,
      ref_id: project_id,
      type: "donation",
      initiator_id: donor_id,
      metadata: notification_metadata,
    });

    // * if the donor is signed into the platform, then notifiy him/her concerning the donation
    if (donor_id)
      // * Notify the donor of this donation
      await add_notification({
        user_id: donor_id,
        ref_id: project_id,
        type: "donation",
        initiator_id: orphanage_id,
        metadata: {
          ...notification_metadata,
          donor_name: "You",
          donation_id: donation_id,
          orphanage_id,
        },
      });
  } catch (error) {
    console.error(error);
    throw new Error((error as any).message || error);
  }
};

/**
 * * Function responsible for retrieving the listof donations made by a donor
 * @param user_id The ID of the donor who made the donations
 * @returns The list of donations made by the donor
 */
export const get_donations = async (
  account_type: TUserRoles,
  user_id: string,
  project_id?: string
) => {
  try {
    // * Add this donation to the donation collection
    const donations = await database.listDocuments<Models.Document & TDonation>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.DONATIONS_COLLECTION_ID,
      [
        ...(!project_id
          ? [
              Query.equal(
                account_type === "orphanage" ? "orphanage_id" : "donor",
                user_id
              ),
            ]
          : []),
        ...(project_id ? [Query.equal("project", project_id)] : []),
      ]
    );

    const parsed_donations: TDonation[] = [];

    // * Retrieve the donor details from these donations
    for (const donation of donations.documents) {
      const donor_response = await users.get<TUser>(
        (donation.donor as string) || ""
      );

      const donor = donor_response.$id
        ? { ...donor_response.prefs, $id: donor_response.$id }
        : undefined;

      parsed_donations.push({ ...donation, donor: donor });
    }

    return parsed_donations;
  } catch (error) {
    console.error(error);
    throw new Error((error as any).message || error);
  }
};
