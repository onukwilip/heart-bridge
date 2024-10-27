import { LinearProgress } from "@mui/material";
import React from "react";
import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LinearProgress color="primary" className="w-[300px]" />
    </div>
  );
};

export default Loading;
