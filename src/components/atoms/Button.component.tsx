"use client";
import styled from "@emotion/styled";
import React, { FC } from "react";
import MUIButton, { ButtonProps } from "@mui/material/Button";

const Button: FC<
  ButtonProps & { bgColor?: string; hoverBgColor?: string; outlined?: boolean }
> = (props) => {
  const PrimaryButton = styled(MUIButton)<ButtonProps>(() => ({
    color: "white",
    backgroundColor: props.bgColor || "#007AFF",
    height: "50px",
    "&:hover": {
      backgroundColor: props.hoverBgColor || "rgba(0, 122, 255, 0.7)",
    },
  }));

  const OutlinedButton = styled(MUIButton)<ButtonProps>(() => ({
    color: props.bgColor || "#007AFF",
    border: `1px solid ${props.bgColor || "#007AFF"}`,
    height: "50px",
    "&:hover": {
      borderColor: props.hoverBgColor || "rgba(0, 122, 255, 0.7)",
    },
  }));

  if (props.outlined)
    return <OutlinedButton {...props}>{props.children}</OutlinedButton>;

  return <PrimaryButton {...props}>{props.children}</PrimaryButton>;
};

export default Button;
