import { CircularProgress, LinearProgress } from "@mui/material";
import React, { FC } from "react";

const Loader: FC<{
  type?: "button" | "page" | "skeleton";
  className?: string;
}> = ({ type, className }) => {
  if (type === "button")
    return (
      <CircularProgress
        size="1rem"
        color="inherit"
        className={`text-white ${className || ""}`}
      />
    );

  return (
    <LinearProgress
      color="primary"
      className={`w-[100px] ${className || ""}`}
    />
  );
};

export default Loader;
