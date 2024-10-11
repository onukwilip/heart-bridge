"use client";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import React, { FC, useState } from "react";
import Button from "../atoms/Button.component";
import TextField from "../atoms/TextField.component";
import { FormControl } from "../atoms/FormControl.component";
import Link from "next/link";
import GoogleButton from "../atoms/GoogleSSO.component";
import { useInput } from "use-manage-form";
import { handle_input_change } from "@/utils/auth.utils";

enum SIGNUP_FORMSTATE {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  EMAIL = "email",
  ACCOUNT_TYPE = "account_type",
  PASSWORD = "password",
}

const SignUpForm: FC<{ className?: string }> = ({ className }) => {
  const [show_password, setShowPassword] = useState(false);
  const [form_state, setFormState] = useState<{
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    account_type: "orphanage" | "donor";
  }>({
    email: "",
    account_type: "orphanage",
    firstname: "",
    lastname: "",
    password: "",
  });

  return (
    <form className={`w-full flex flex-col items-center gap-3 ${className}`}>
      <div className="flex items-center justify-center w-full gap-3">
        {/* Firstname field */}
        <TextField
          name={SIGNUP_FORMSTATE.FIRSTNAME}
          label="Firstname"
          placeholder="Enter firstname"
          onChange={(e) =>
            handle_input_change(e.target.name, e.target.value, setFormState)
          }
          value={form_state.firstname}
          variant="outlined"
          className="w-full"
          required
        />
        {/* Lastname field */}
        <TextField
          name={SIGNUP_FORMSTATE.LASTNAME}
          label="Lastname"
          placeholder="Enter lastname"
          onChange={(e) =>
            handle_input_change(e.target.name, e.target.value, setFormState)
          }
          value={form_state.lastname}
          variant="outlined"
          className="w-full"
          required
        />
      </div>
      {/* Account type field */}
      <FormControl variant="outlined" className="w-full" required>
        <InputLabel id="demo-customized-select-label">
          Select Account Type
        </InputLabel>
        <Select
          name={SIGNUP_FORMSTATE.ACCOUNT_TYPE}
          input={<OutlinedInput label="Select Account Type" />}
          value={form_state.account_type}
          onChange={(e) =>
            handle_input_change(e.target.name, e.target.value, setFormState)
          }
          required
        >
          <MenuItem value={"orphanage"}>Orphanage</MenuItem>
          <MenuItem value={"donor"}>Donor</MenuItem>
        </Select>
      </FormControl>
      {/* Email field */}
      <TextField
        name={SIGNUP_FORMSTATE.EMAIL}
        label="Email"
        placeholder="Enter email address"
        type="email"
        onChange={(e) =>
          handle_input_change(e.target.name, e.target.value, setFormState)
        }
        value={form_state.email}
        variant="outlined"
        className="w-full"
        required
      />
      {/* Password field */}
      <FormControl variant="outlined" className="w-full" required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          name={SIGNUP_FORMSTATE.PASSWORD}
          id="password"
          type={show_password ? "text" : "password"}
          onChange={(e) =>
            handle_input_change(e.target.name, e.target.value, setFormState)
          }
          value={form_state.password}
          title="Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
          endAdornment={
            <InputAdornment
              position="end"
              onClick={() => setShowPassword(!show_password)}
            >
              <i
                className={`fas ${
                  show_password ? "fa-eye-slash" : "fa-eye"
                } text-primary-grey cursor-pointer`}
              ></i>
            </InputAdornment>
          }
          label="Password"
          required
        />
      </FormControl>
      <br />
      {/* Signup button */}
      <div className="w-full">
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </div>
      <span>
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary">
          Login here
        </Link>
      </span>
      {/* Google SSO button */}
      <div className="w-full">
        <GoogleButton data={{ email: form_state.email }} signup />
      </div>
    </form>
  );
};

export default SignUpForm;
