import styled from "@emotion/styled";
import React, { FC } from "react";
import MUIButton, { ButtonProps } from "@mui/material/Button";

const Button: FC<ButtonProps & { bgColor?: string; hoverBgColor?: string }> = (
  props
) => {
  const PrimaryButton = styled(MUIButton)<ButtonProps>(() => ({
    color: "white",
    backgroundColor: props.bgColor || "#007AFF",
    height: "50px",
    "&:hover": {
      backgroundColor: props.hoverBgColor || "rgba(0, 122, 255, 0.7)",
    },
  }));

  return <PrimaryButton {...props}>{props.children}</PrimaryButton>;
};

export default Button;
