"use server";
import database from "@/utils/appwrite/node_appwrite_database.utils";
import users from "@/utils/appwrite/node_appwrite_users.utils";
import { APPWRITE_DATABASE, TProject, TUser } from "@/utils/types";
import { Models, Query } from "node-appwrite";

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
    }

    // * Update the rest of the user information
    await users.updatePrefs(user.$id, {
      firstname: user.firstname,
      lastname: user.lastname,
      orphanage_name: user.orphanage_name,
      account_type: current_user.prefs.account_type,
      bio: user.bio || current_user.prefs.bio,
      image: user.image || current_user.prefs.image,
    });
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
): Promise<Models.User<TUser> & { projects: TProject[] }> => {
  try {
    // * Retrieves the details of the user
    const user = await users.get<TUser>(orphanage_id);

    // * If the user is not an orphanage, but a donor, throw error
    if (user.prefs.account_type === "donor")
      throw new Error(JSON.stringify({ code: 403 }));

    // * Retrieve list of project created by this orphanage account
    const user_projects = await database.listDocuments<
      Models.Document & TProject
    >(APPWRITE_DATABASE.DB_ID, APPWRITE_DATABASE.PROJECTS_COLLECTION_ID, [
      Query.equal("user_id", orphanage_id),
    ]);

    // console.log("USER PROJECTS", user_projects.documents);

    return { ...user, projects: user_projects.documents };
  } catch (error) {
    console.error(error);
    throw new Error((error as any)?.message || error);
  }
};
