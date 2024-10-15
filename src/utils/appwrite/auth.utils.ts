import { ID } from "appwrite";
import account from "./appwrite_account.utils";
import { SIGNUP_FORMSTATE, TUser } from "../types";

/**
 * * Function responsible for creating a new user
 * @param data The user details
 */
export const create_account = async (data: TUser) => {
  // * Generates a unique ID string for the user
  const user_id = ID.unique();

  // * Creates the user in the user collection
  const created_user = await account.create(user_id, data.email, data.password);
  console.log("CREATED USER", created_user);

  try {
    // * Automatically sign the old current user out if he/she was previously signed in
    await account.deleteSession("current");
    console.log("SIGNED OUT CURRENT USER");
  } catch (error) {
    console.log("NO USER LOGGED IN PREVIOUSLY");
  } finally {
    // * Automatically sign the newly created user in
    const current_session = await account.createEmailPasswordSession(
      data.email,
      data.password
    );
    console.log("SIGNED IN NEW USER", current_session);

    // * Update other information concerning the newly created user
    const updated_user = await account.updatePrefs({
      [SIGNUP_FORMSTATE.FIRSTNAME]: data.firstname,
      [SIGNUP_FORMSTATE.LASTNAME]: data.lastname,
      [SIGNUP_FORMSTATE.ACCOUNT_TYPE]: data.account_type,
    });
    console.log("UPDATED USER", updated_user);

    // * Get the signed in user details (the user who was just created)
    const current_user = await account.get<TUser>();

    // * Return the details of the signed in user
    return current_user;
  }
};

/**
 * * Function responsible for signing a user in
 * @param data The user email and password
 */
export const sign_in = async (
  data: Omit<TUser, "firstname" | "lastname" | "account_type">
) => {
  try {
    // * Automatically sign the old current user out if he/she was previously signed in
    await account.deleteSession("current");
    console.log("SIGNED OUT CURRENT USER");
  } catch (error) {
    console.log("NO USER LOGGED IN PREVIOUSLY");
  } finally {
    // * Automatically sign the new user in
    await account.createEmailPasswordSession(data.email, data.password);

    // * Get the signed in user details
    const new_current_user = await account.get<TUser>();

    // * Return the details of the signed in user
    return new_current_user;
  }
};

/**
 * * Function responsible for logging a user out
 */
export const logout = async () => {
  try {
    // * Automatically sign the current user out
    await account.deleteSession("current");
    console.log("SIGNED OUT CURRENT USER");
  } catch (error) {
    console.log("NO USER LOGGED IN PREVIOUSLY");
  }
};
