import React, { FC } from "react";
import Button from "./Button.component";
import { ButtonProps } from "@mui/material";
import google_img from "@/images/google-icon.png";
import Image from "next/image";

const GoogleButton: FC<
  ButtonProps & { data: { email: string }; signup?: boolean }
> = (props) => {
  return (
    <>
      <Button
        bgColor="transparent"
        hoverBgColor="transparent"
        variant="outlined"
        {...props}
        className={`w-full border !border-primary-grey flex gap-4 ${
          props.className ? props.className : ""
        }`}
      >
        <span>
          {!props.signup ? "Continue with Google" : "Sign up with Google"}
        </span>
        <Image width={20} height={20} src={google_img.src} alt="google icon" />
      </Button>
    </>
  );
};

export default GoogleButton;
