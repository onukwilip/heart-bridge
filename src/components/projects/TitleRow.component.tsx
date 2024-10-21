"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../atoms/Button.component";
import { useModalContext } from "@/contexts/Modal.context";
import CreateOrEditProject from "./CreateOrEditProject.component";
import { useUserContext } from "@/contexts/User.context";

const TitleRow = () => {
  const { open_modal } = useModalContext();
  const { user } = useUserContext();

  /**
   * * Function responsible for displaying the modal to create project
   */
  const handle_create_click = () => {
    open_modal({
      children: <CreateOrEditProject user_id={user?.$id || ""} />,
    });
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl text-white font-semibold">Projects</h2>
      <Button
        variant="outlined"
        className="text-sm px-2-0 py-1 font-semibold rounded-md"
        onClick={handle_create_click}
      >
        <FaPlus className="mr-2" />
        Add project
      </Button>
    </div>
  );
};

export default TitleRow;
