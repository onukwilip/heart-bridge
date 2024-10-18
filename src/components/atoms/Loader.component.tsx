import { CircularProgress } from "@mui/material";
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

  return <>Loading...</>;
};

export default Loader;
