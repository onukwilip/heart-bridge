"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import MUIModal from "@mui/material/Modal";
import { Box, Drawer } from "@mui/material";
import { useModalContext } from "@/contexts/Modal.context";

/**
 * * Modal component to display content in a modal or drawer
 * @returns - React component
 */
const Modal: FC = () => {
  const { modal, close_modal } = useModalContext();
  const [screen_size, setScreenSize] = useState({
    width: 0,
    height: 0,
  });

  /**
   * * Updates the current window/screen size
   */
  const update_screen_size = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // * Update screen size on initial load
    update_screen_size();
    // * Add event listener to handle window resize
    window.addEventListener("resize", update_screen_size);
    // * Clean up event listener on component unmount
    return () => window.removeEventListener("resize", update_screen_size);
  }, []);

  return (
    <>
      {screen_size.width >= 480 ? (
        <MUIModal open={modal.open} onClose={close_modal}>
          <div className="w-[95%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-dark rounded-xl shadow-lg p-4 xs:w-[400px] sm:w-[600px] max-h-[80vh] overflow-y-auto">
            {modal.children}
          </div>
        </MUIModal>
      ) : (
        <Drawer anchor={"bottom"} open={modal.open} onClose={close_modal}>
          <div className="w-full bg-primary-dark p-4 min-h-[300px] max-h-[80vh] overflow-y-auto">
            {modal.children}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Modal;
