"use server";
import database from "@/utils/appwrite/node_appwrite_database.utils";
import users from "@/utils/appwrite/node_appwrite_users.utils";
import {
  APPWRITE_DATABASE,
  TProject,
  TUser,
  TUserLocation,
} from "@/utils/types";
import { AppwriteException, Models, Query } from "node-appwrite";

/**
 * * Function responsible for updating or creating a user location in the Location collection
 * @param location_id The ID of the user whose location to be created or updated
 * @param location The details of the location
 * @returns void
 */
const create_or_update_location = async (
  location_id: string,
  location: TUserLocation,
  first_time?: boolean
) => {
  try {
    // * Check if the user already exists in the Users collection
    const existing_user = await database.getDocument(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.LOCATION_COLLECTION_ID,
      location_id
    );

    // * If the location already exists, update the details in the Location collection
    if (existing_user) {
      // * Update the user's location details in the Location collection as well to maintain consistency
      await database.updateDocument(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.LOCATION_COLLECTION_ID,
        location_id,
        { ...location, user: location_id }
      );
      return;
    }

    // * Else, Create the user's  location details in the Location collection
    await database.createDocument(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.LOCATION_COLLECTION_ID,
      location_id,
      { ...location, user: location_id }
    );
    return;
  } catch (error) {
    const modified_error = error as AppwriteException;
    // * If the error was that of user's location not found, create a new location in the collection
    if (modified_error?.code === 404) {
      await database.createDocument(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.LOCATION_COLLECTION_ID,
        location_id,
        { ...location, user: location_id }
      );
      return;
    }
    console.error("LOCATION ERROR", error);
    throw new AppwriteException(modified_error.message, modified_error.code);
  } finally {
    if (first_time) {
      try {
        // * Update the user's location in the Users collection as well to maintain consistency if the location was just being created
        await database.updateDocument(
          APPWRITE_DATABASE.DB_ID,
          APPWRITE_DATABASE.USERS_COLLECTION_ID,
          location_id,
          { location: location_id }
        );
      } catch (error) {
        console.error(
          "Could not update user's location in the Users collection"
        );
      }
    }
  }
};

/**
 * * Function responsible for updating or creating a user in the Users collection
 * @param user_id The ID of the user to be created or updated
 * @param user The details of the user to be created or update
 * @returns void
 */
const create_or_update_user = async (
  user_id: string,
  user: Omit<TUser, "password">,
  create_location?: boolean
) => {
  try {
    // * Update the user's details in the Users collection as well to maintain consistency
    const updated_user = await database.updateDocument<Models.Document & TUser>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.USERS_COLLECTION_ID,
      user_id,
      { ...user, location: user_id }
    );
    // * If the user's location is provided, update it in the Location collection as well to maintain consistency
    if (create_location && typeof user.location === "object")
      await create_or_update_location(
        user_id,
        user.location,
        updated_user.location ? false : true
      );
  } catch (error) {
    const modified_error = error as AppwriteException;
    // * If the error was that of user not found, create a new user in the collection
    if (modified_error?.code === 404) {
      const created_user = await database.createDocument<
        Models.Document & TUser
      >(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.USERS_COLLECTION_ID,
        user_id,
        { ...user, location: user_id }
      );
      // * If the user's location is provided, update it in the Location collection as well to maintain consistency
      if (create_location && typeof user.location === "object")
        await create_or_update_location(
          user_id,
          user.location,
          created_user.location ? false : true
        );
      return;
    }
    console.error("USER ERROR", error);
    throw new AppwriteException(modified_error.message, modified_error.code);
  }
};

/**
 * * Function responsible for updating the user profile information
 * @param user The user details to update, e.g. email, firstname, etc...
 */
export const update_user_profile = async (
  user: Omit<TUser, "account_type"> & { $id: string }
) => {
  try {
    // * Retrieve the current user information
    const current_user = await users.get<TUser>(user.$id);

    // * If the user changed its email address, update it
    if (current_user.email !== user.email) {
      await users.updateEmail(user.$id, user.email);
      // * Update the user's email in the Users collection as well to maintain consistency
      await database.updateDocument(
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.USERS_COLLECTION_ID,
        user.$id,
        { email: user.email }
      );
      // * Update the user's email in the Users collection as well to maintain consistency
      await create_or_update_user(user.$id, {
        email: user.email || current_user.email,
        firstname: current_user.prefs.firstname,
        lastname: current_user.prefs.lastname,
        account_type: current_user.prefs.account_type,
      });
    }

    const details_to_update: Omit<TUser, "email" | "password"> = {
      firstname: user.firstname || current_user.prefs.firstname,
      lastname: user.lastname || current_user.prefs.lastname,
      ...(current_user.prefs.account_type === "orphanage"
        ? {
            orphanage_name:
              user.orphanage_name || current_user.prefs.orphanage_name,
          }
        : {}),
      account_type: current_user.prefs.account_type,
      bio: user.bio || current_user.prefs.bio,
      phone_number: user.phone_number || current_user.prefs.phone_number,
      image: user.image || current_user.prefs.image,
      ...(current_user.prefs.account_type === "orphanage"
        ? { location: user.location || current_user.prefs.location }
        : {}),
    };

    // * Update the rest of the user information
    await users.updatePrefs(user.$id, details_to_update);
    // * Update the user's details in the Users collection as well to maintain consistency
    await create_or_update_user(
      user.$id,
      {
        ...details_to_update,
        email: current_user.email,
      },
      true
    );
  } catch (error) {
    console.error(error);
    throw new Error((error as any)?.message || error);
  }
};

/**
 * * Function responsible for retrieving the details, and projects of a user
 * @param orphanage_id The ID of the orphanage to return
 */
export const get_user_profile = async (
  orphanage_id: string
): Promise<TUser & { projects: TProject[] }> => {
  try {
    // * Retrieves the details of the user
    // const user = await users.get<TUser>(orphanage_id);
    const user = await database.getDocument<Models.Document & TUser>(
      APPWRITE_DATABASE.DB_ID,
      APPWRITE_DATABASE.USERS_COLLECTION_ID,
      orphanage_id
    );

    // * If the user is not an orphanage, but a donor, throw error
    if (user.account_type === "donor")
      throw new Error(JSON.stringify({ code: 403 }));

    // * Retrieve list of projects created by this orphanage account
    const user_projects = await database.listDocuments<
      Models.Document & TProject
    >(APPWRITE_DATABASE.DB_ID, APPWRITE_DATABASE.PROJECTS_COLLECTION_ID, [
      Query.equal("user_id", orphanage_id),
    ]);

    // console.log("USER", { ...user, projects: user_projects.documents });

    return { ...user, projects: user_projects.documents };
  } catch (error) {
    console.error(error);
    throw new Error((error as any)?.message || error);
  }
};
