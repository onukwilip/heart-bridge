"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../atoms/Button.component";

const TitleRow = () => {
  return (
    <div className="flex justify-between">
      <h2 className="text-2xl text-white font-semibold">Projects</h2>
      <Button
        variant="outlined"
        className="text-sm px-2-0 py-1 font-semibold rounded-md"
      >
        <FaPlus className="mr-2" />
        Add project
      </Button>
    </div>
  );
};

export default TitleRow;
