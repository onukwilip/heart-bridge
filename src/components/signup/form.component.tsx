"use client";
import {
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { FC, FormEventHandler, useState } from "react";
import Button from "../atoms/Button.component";
import TextField from "../atoms/TextField.component";
import { FormControl } from "../atoms/FormControl.component";
import Link from "next/link";
import GoogleButton from "../atoms/GoogleSSO.component";
import { handle_input_change } from "@/utils/auth.utils";
import { SIGNUP_FORMSTATE, TUser } from "@/utils/types";
import { useRouter } from "next/navigation";
import { create_account } from "@/utils/appwrite/auth.utils";
import { AppwriteException } from "appwrite";
import useFetch from "@/hooks/useFetch.hook";
import Loader from "../atoms/Loader.component";

const SignUpForm: FC<{ className?: string }> = ({ className }) => {
  const nav_router = useRouter();
  const [show_password, setShowPassword] = useState(false);
  const [form_state, setFormState] = useState<TUser>({
    email: "",
    account_type: "orphanage",
    firstname: "",
    lastname: "",
    password: "",
  });
  const fetch_state = useFetch();

  /**
   * * function for submitting the form and creating the user
   * @param e The form submit event
   */
  const submit_handler: FormEventHandler<HTMLFormElement> = async (e) => {
    // * Prevent the form from reloading the page when it's submitted
    e.preventDefault();

    // * Display the loading state
    fetch_state.display_loading();

    try {
      // * Create the user account
      await create_account(form_state);

      // * Display success message
      fetch_state.display_success("User created successfully");

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
          <Button
            className="w-full"
            type="submit"
            disabled={fetch_state.loading}
          >
            {fetch_state.loading ? <Loader type="button" /> : "Sign Up"}
          </Button>
        </div>
        {/* Sign in link */}
        <span>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary">
            Login here
          </Link>
        </span>
        {/* Google sign up button */}
        <div className="w-full">
          <GoogleButton
            data={{ email: form_state.email }}
            disabled={fetch_state.loading}
            signup
          />
        </div>
      </form>
      {/* The error state */}
      {fetch_state.error && (
        <Snackbar
          open={fetch_state.error ? true : false}
          onClose={() => fetch_state.setError(undefined)}
          autoHideDuration={6000}
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
          autoHideDuration={6000}
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

export default SignUpForm;
