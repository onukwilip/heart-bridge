"use client";
import React, { FC, ReactNode } from "react";
import MUIModal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useModalContext } from "@/contexts/Modal.context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "#121212",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const Modal: FC = () => {
  const { modal, close_modal } = useModalContext();
  return (
    <MUIModal open={modal.open} onClose={close_modal}>
      {/* <Box sx={style}>{modal.children}</Box> */}
      <div className="w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121212] rounded-xl shadow-lg p-4">
        {modal.children}
      </div>
    </MUIModal>
  );
};

export default Modal;
