"use client";
import { InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import React, { FC, useState } from "react";
import Button from "../atoms/Button.component";
import TextField from "../atoms/TextField.component";
import { FormControl } from "../atoms/FormControl.component";
import Link from "next/link";
import GoogleButton from "../atoms/GoogleSSO.component";
import { handle_input_change } from "@/utils/auth.utils";

enum LOGIN_FORMSTATE {
  EMAIL = "email",
  PASSWORD = "password",
}

const LoginForm: FC<{ className?: string }> = ({ className }) => {
  const [show_password, setShowPassword] = useState(false);
  const [form_state, setFormState] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  return (
    <form className={`w-full flex flex-col items-center gap-3 ${className}`}>
      {/* Email field */}
      <TextField
        name={LOGIN_FORMSTATE.EMAIL}
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
          name={LOGIN_FORMSTATE.PASSWORD}
          id="password"
          type={show_password ? "text" : "password"}
          onChange={(e) =>
            handle_input_change(e.target.name, e.target.value, setFormState)
          }
          value={form_state.password}
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
        />
      </FormControl>
      <br />
      <div className="w-full">
        <Button className="w-full" type="submit">
          Login
        </Button>
      </div>
      <span>
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-primary">
          Create an Account
        </Link>
      </span>
      <div className="w-full">
        <GoogleButton data={{ email: form_state.email }} />
      </div>
    </form>
  );
};

export default LoginForm;
