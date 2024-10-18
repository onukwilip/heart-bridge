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

// * The modal context
const ModalContext = createContext<{
  modal: { open: boolean; children: ReactNode };
  open_modal: (config: { children: ReactNode }) => void;
  close_modal: () => void;
}>({
  modal: { open: false, children: undefined },
  open_modal: () => {},
  close_modal: () => {},
});

/**
 * * The modal context provider component
 * @returns The modal context provider
 */
const ModalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<{ open: boolean; children: ReactNode }>({
    open: false,
    children: undefined,
  });

  /**
   * * Function responsible for opening the modal
   * @param config The object containing the the modal's children
   */
  const open_modal = (config: { children: ReactNode }) => {
    setModal({ open: true, children: config.children });
  };

  /**
   * * Function responsible for closing the modal
   */
  const close_modal = () => {
    setModal({ open: false, children: undefined });
  };

  return (
    <ModalContext.Provider value={{ modal, open_modal, close_modal }}>
      {children}
    </ModalContext.Provider>
  );
};

/**
 * * Hook responsible for retrieving the modal context values
 * @returns The modal context values
 */
export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error(
      "Component needs to be wrapped in the Modal context provider"
    );
  return context;
};

export default ModalContextProvider;
