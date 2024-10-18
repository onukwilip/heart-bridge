"use client";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import React, { FC, FormEventHandler, useState } from "react";
import Button from "../atoms/Button.component";
import TextField from "../atoms/TextField.component";
import { FormControl } from "../atoms/FormControl.component";
import Link from "next/link";
import GoogleButton from "../atoms/GoogleSSO.component";
import { handle_input_change } from "@/utils/input.utils";
import useFetch from "@/hooks/useFetch.hook";
import { sign_in } from "@/utils/appwrite/auth.utils";
import { SIGNUP_FORMSTATE, TUser } from "@/utils/types";
import { useRouter } from "next/navigation";
import { AppwriteException } from "appwrite";
import Loader from "../atoms/Loader.component";

const LoginForm: FC<{ className?: string }> = ({ className }) => {
  const nav_router = useRouter();
  const [show_password, setShowPassword] = useState(false);
  const fetch_state = useFetch();
  const [form_state, setFormState] = useState<
    Omit<TUser, "firstname" | "lastname" | "account_type">
  >({
    email: "",
    password: "",
  });

  /**
   * * Function for submitting the form and creating the user
   * @param e The form submit event
   */
  const submit_handler: FormEventHandler<HTMLFormElement> = async (e) => {
    // * Prevent the form from reloading the page when it's submitted
    e.preventDefault();

    // * Display the loading state
    fetch_state.display_loading();

    try {
      // * Sign the user in
      await sign_in(form_state);

      // * Display success message
      fetch_state.display_success("User sign in successfully");

      // * Navigate to the user's dashboard
      nav_router.push(`/dashboard`);
    } catch (error) {
      // * Display error message if error occurred
      fetch_state.display_error((error as AppwriteException).message);
    }
  };

  return (
    <>
      <form
        className={`w-full flex flex-col items-center gap-3 ${className}`}
        onSubmit={submit_handler}
      >
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
        {/* SIgn in button */}
        <div className="w-full">
          <Button
            className="w-full"
            type="submit"
            disabled={fetch_state.loading}
          >
            {fetch_state.loading ? <Loader type="button" /> : "Login"}
          </Button>
        </div>
        {/* Sign up link */}
        <span>
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary">
            Create an Account
          </Link>
        </span>
        {/* Google sign in button */}
        <div className="w-full">
          <GoogleButton
            data={{ email: form_state.email }}
            disabled={fetch_state.loading}
          />
        </div>
      </form>
      {/* The error state */}
      {fetch_state.error && (
        <Snackbar
          open={fetch_state.error ? true : false}
          onClose={() => fetch_state.setError(undefined)}
        >
          <Alert color="error" onClose={() => fetch_state.setError(undefined)}>
            {fetch_state.error}
          </Alert>
        </Snackbar>
      )}
      {/* The success state */}
      {fetch_state.success && (
        <Snackbar
          open={fetch_state.success ? true : false}
          onClose={() => fetch_state.setSuccess(undefined)}
        >
          <Alert
            color="success"
            onClose={() => fetch_state.setSuccess(undefined)}
          >
            {fetch_state.success}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default LoginForm;
