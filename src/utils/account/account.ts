import { refresh_current_user } from "../appwrite/auth.utils";

/**
 * * Refresh user details on modal close
 */
export const refresh_user_details = async (
  populate_user: () => Promise<void>
) => {
  await refresh_current_user();
  await populate_user();
};
