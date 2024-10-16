"use client";
import styled from "@emotion/styled";
import MUITextField from "@mui/material/TextField";

export const RoundedTextField = styled(MUITextField)({
  "& label": {
    color: "rgba(255, 255, 255, 0.3)",
  },
  "& label.Mui-focused": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  "&:hover label": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },
  "& .MuiOutlinedInput-root": {
    color: "rgba(255, 255, 255, 0.3)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "50px",
    },

    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&:hover": {
      color: "rgba(255, 255, 255, 0.5)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
});

export default RoundedTextField;
