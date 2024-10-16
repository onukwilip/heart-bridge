"use client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

// * The sidebar context
const SideBarContext = createContext<{
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}>({
  expand: false,
  setExpand: () => {},
});

/**
 * * The sidebar context provider component
 * @returns The sidebar context provider
 */
const SideBarContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [expand, setExpand] = useState(false);
  return (
    <SideBarContext.Provider value={{ expand, setExpand }}>
      {children}
    </SideBarContext.Provider>
  );
};

/**
 * * Hook responsible for retrieving the sidebar context values
 * @returns The sidebar context values
 */
export const useSideBarContext = () => {
  const context = useContext(SideBarContext);

  if (!context)
    throw new Error(
      "Component needs to be wrapped in the SideBar context provider"
    );
  return context;
};

export default SideBarContextProvider;
