"use server";

import database from "@/utils/appwrite/node_appwrite_database.utils";
import users from "@/utils/appwrite/node_appwrite_users.utils";
import {
  APPWRITE_DATABASE,
  USER_FORMSTATE,
  TProject,
  TUser,
  TUserAddress,
  TUserLocation,
} from "@/utils/types";
import { Models, Query } from "node-appwrite";

/**
 * * Funchtion responsible for searching for orphanages in the database
 * @param name The name of the orphanage to search for
 */
export const search_orphanages = async (name: string) => {
  try {
    // * Search for orphanages in the database using the provided name
    const orphanages = await database.listDocuments<Models.Document & TUser>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.USERS_COLLECTION_ID,
      [
        Query.and([
          Query.equal(USER_FORMSTATE.ACCOUNT_TYPE, "orphanage"),
          Query.contains(USER_FORMSTATE.ORPHANAGE_NAME, name),
        ]),
      ]
    );

    return orphanages.documents;
  } catch (error) {
    console.error(error);
    throw new Error((error as any)?.message || error);
  }
};

/**
 * * Funchtion responsible for searching for orphanages within the user's location in the database
 * @param name The name of the orphanage to search for
 */
export const search_nearby_orphanages = async (location: TUserLocation) => {
  try {
    // console.log("PROVIDED LOCATION", location);

    // * Search for orphanages in the database within the provided location
    const orphanages_locations = await database.listDocuments<
      Models.Document & TUserLocation
    >(APPWRITE_DATABASE.DB_ID, APPWRITE_DATABASE.LOCATION_COLLECTION_ID, [
      Query.or([
        // * Search for orphanages in the database within the user's city, state, and country
        Query.and([
          Query.equal("city", location.city || ""),
          Query.equal("state", location.state || ""),
          Query.equal("country", location.country || ""),
        ]),
        // * OR Search for orphanages in the database within the user's state and country
        Query.and([
          Query.equal("state", location.state || ""),
          Query.equal("country", location.country || ""),
        ]),
        // * OR Search for orphanages in the database within the user's country
        Query.equal("country", location.country || ""),
      ]),
    ]);

    console.log(
      "NEARBY ORPHANAGES",
      orphanages_locations.documents.map(
        (location) => (location.user as TUser)?.location
      )
    );

    return orphanages_locations.documents.map(
      (location) => location.user as TUser
    );
  } catch (error) {
    console.error(error);
    throw new Error((error as any)?.message || error);
  }
};

/**
 * * Funchtion responsible for searching for projects in the database
 * @param name The name of the project to search for
 */
export const search_projects = async (name: string) => {
  try {
    // * Search for orphanages in the database using the provided name
    const projects = await database.listDocuments<Models.Document & TProject>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
      [Query.contains("title", name)]
    );

    return projects.documents;
  } catch (error) {
    console.error(error);
    throw new Error((error as any)?.message || error);
  }
};
