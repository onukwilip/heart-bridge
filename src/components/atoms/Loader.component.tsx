import { CircularProgress } from "@mui/material";
import React, { FC } from "react";

const Loader: FC<{ type?: "button" | "page" | "skeleton" }> = ({ type }) => {
  if (type === "button")
    return (
      <CircularProgress size="1rem" color="inherit" className="text-white" />
    );

  return <>Loading...</>;
};

export default Loader;
