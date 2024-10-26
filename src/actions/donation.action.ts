"use server";
import database from "@/utils/appwrite/node_appwrite_database.utils";
import users from "@/utils/appwrite/node_appwrite_users.utils";
import { APPWRITE_DATABASE, TDonation, TUser } from "@/utils/types";
import { ID, Models, Query } from "node-appwrite";

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
}: {
  orphanage_id: string;
  project_id: string;
  comment?: string;
  donor_id?: string;
  amount: string;
}) => {
  try {
    const id = ID.unique();
    // * Add this donation to the donation collection
    await database.createDocument<Models.Document & TDonation>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.DONATIONS_COLLECTION_ID,
      id,
      { orphanage_id, project: project_id, comment, donor: donor_id, amount }
    );
  } catch (error) {
    console.error(error);
    throw new Error((error as any).message || error);
  }
};

/**
 * * Function responsible for retrieving the listof donations made by a donor
 * @param donor_id The ID of the donor who made the donations
 * @returns The list of donations made by the donor
 */
export const get_donations = async (donor_id: string) => {
  try {
    // * Add this donation to the donation collection
    const donations = await database.listDocuments<Models.Document & TDonation>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.DONATIONS_COLLECTION_ID,
      [Query.equal("donor", donor_id)]
    );

    const parsed_donations: TDonation[] = [];

    // * Retrieve the donor details from these donations
    for (const donation of donations.documents) {
      const donor_response = await users.get<TUser>(
        (donation.donor as string) || ""
      );

      const donor = { ...donor_response.prefs, $id: donor_response.$id };

      parsed_donations.push({ ...donation, donor });
    }

    return parsed_donations;
  } catch (error) {
    console.error(error);
    throw new Error((error as any).message || error);
  }
};
