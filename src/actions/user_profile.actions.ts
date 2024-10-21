"use server";
import users from "@/utils/appwrite/appwrite_users.utils";
import { TUser } from "@/utils/types";

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
