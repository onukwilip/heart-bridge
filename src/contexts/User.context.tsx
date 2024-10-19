"use client";
import { get_current_user } from "@/utils/appwrite/auth.utils";
import { TUser } from "@/utils/types";
import { Models } from "appwrite";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// * The sidebar context
const UserContext = createContext<{
  user: Models.User<TUser> | undefined;
  populate_user: () => Promise<void>;
}>({
  user: undefined,
  populate_user: async () => {},
});

/**
 * * The user context provider component
 * @returns The user context provider
 */
const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<TUser>>();

  /**
   * * Retrieves the user details from the cookies and populates the user stte with it
   */
  const populate_user = async () => {
    const user = await get_current_user();

    if (!user) return;

    setUser(user);
  };

  useEffect(() => {
    populate_user();
  }, []);

  return (
    <UserContext.Provider value={{ user, populate_user }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * * Hook responsible for retrieving the user context values
 * @returns The user context values
 */
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error(
      "Component needs to be wrapped in the User context provider"
    );
  return context;
};

export default UserContextProvider;
