import { ID, Models } from "appwrite";
import account from "./appwrite_account.utils";
import { SIGNUP_FORMSTATE, TUser } from "../types";
import cookies from "js-cookie";
import { USER_COOKIE_NAME } from "../constants";

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
      ...(data.orphanage_name
        ? { [SIGNUP_FORMSTATE.ORPHANAGE_NAME]: data.orphanage_name }
        : {}),
    });
    console.log("UPDATED USER", updated_user);

    // * Get the signed in user details (the user who was just created)
    const current_user = await account.get<TUser>();

    // * Set the signed in user details in the cookies
    cookies.set(USER_COOKIE_NAME, JSON.stringify(current_user));

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

    // * Set the signed in user details in the cookies
    cookies.set(USER_COOKIE_NAME, JSON.stringify(new_current_user));

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
    // * Remove the signed in user details from the cookies
    cookies.remove(USER_COOKIE_NAME);

    console.log("SIGNED OUT CURRENT USER");
  } catch (error) {
    console.log("NO USER LOGGED IN PREVIOUSLY");
  }
};

/**
 * * Get's the user details of the signed in user
 */
export const get_current_user = async () => {
  try {
    // * Retrieves the signed in user from the cookies
    const existing_user = cookies.get(USER_COOKIE_NAME);
    if (existing_user) return JSON.parse(existing_user) as Models.User<TUser>;

    // * Returns the details of the signed in user from appwrite if the user doesn't exist in the cookies and adds the user to the cookies
    const user = await account.get<TUser>();
    cookies.set(USER_COOKIE_NAME, JSON.stringify(user));

    return user;
  } catch (error) {
    return undefined;
  }
};

/**
 * * Refreshes the user details of the signed in user, e.g. when the user edits it's details
 */
export const refresh_current_user = async () => {
  try {
    // * Deletes the signed in user from the cookies
    cookies.remove(USER_COOKIE_NAME);

    // * Returns the details of the signed in user from appwrite if the user doesn't exist in the cookies and adds the user to the cookies
    const user = await account.get<TUser>();

    cookies.set(USER_COOKIE_NAME, JSON.stringify(user));

    return user;
  } catch (error) {
    return undefined;
  }
};
