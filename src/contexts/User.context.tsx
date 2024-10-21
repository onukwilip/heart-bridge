"use client";
import useFetch from "@/hooks/useFetch.hook";
import { get_current_user } from "@/utils/appwrite/auth.utils";
import { TUser } from "@/utils/types";
import { Models } from "appwrite";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

// * The sidebar context
const UserContext = createContext<{
  user: Models.User<TUser> | undefined;
  populate_user: () => Promise<void>;
  fetch_user_state: {
    error: string | undefined;
    loading: boolean;
    success: string | undefined;
  };
}>({
  user: undefined,
  populate_user: async () => {},
  fetch_user_state: {
    error: undefined,
    loading: false,
    success: undefined,
  },
});

/**
 * * The user context provider component
 * @returns The user context provider
 */
const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Models.User<TUser>>();
  const fetch_user_state = useFetch({ loading: true });
  const router = useRouter();

  /**
   * * Retrieves the user details from the cookies and populates the user stte with it
   */
  const populate_user = async () => {
    // * Indicate that the context is retrieving the user details
    fetch_user_state.display_loading();

    // * Retrieve user from Appwrite API
    const user = await get_current_user();

    // * If user not found, display an error message
    if (!user) {
      fetch_user_state.display_error("User not found");
      return router.push("/auth/login");
    }

    // * Set the user in the state and display a success message
    setUser(user);
    fetch_user_state.display_success("Success");
  };

  useEffect(() => {
    populate_user();
  }, []);

  return (
    <UserContext.Provider value={{ user, populate_user, fetch_user_state }}>
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
