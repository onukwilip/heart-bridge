import { useModalContext } from "@/contexts/Modal.context";
import React, { FC, FormEvent, use, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch.hook";
import { Alert, Snackbar } from "@mui/material";
import { USER_FORMSTATE, TUser } from "@/utils/types";
import { handle_input_change } from "@/utils/input.utils";
import Button from "../atoms/Button.component";
import Loader from "../atoms/Loader.component";
import account from "@/utils/appwrite/appwrite_account.utils";
import { useUserContext } from "@/contexts/User.context";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { update_user_profile } from "@/actions/user_profile.action";

const EditBio: FC<{
  existing_bio: string;
  existing_details: TUser;
  user_id: string;
  post_submit_function?: Function;
}> = ({ existing_bio, existing_details, post_submit_function, user_id }) => {
  const { close_modal } = useModalContext();
  const form_submit_state = useFetch();

  const [form_state, setFormState] = useState<{ bio: string }>({ bio: "" });

  /**
   * * Function responsible for submittin the form, i.e. updating the user bank information
   * @param e The form submit event
   * @returns void
   */
  const form_submit_handler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      // * Preevents the form from reloading the page
      e.preventDefault();

      // * Update the user bio
      await update_user_profile({
        ...existing_details,
        bio: form_state.bio,
        $id: user_id,
      });

      post_submit_function && (await post_submit_function());
      // * Display success message
      form_submit_state.display_success("Successfully updated the user bio");
      // * Close the modal/drawer
      close_modal();
    } catch (error) {
      console.log(error);
      // * Display an error message
      form_submit_state.display_error((error as any).message || error);
    }
  };

  /**
   * * Function responsible for auto-filling the input fields with the existing bank information
   * @returns void
   */
  const auto_fill_input_fields = () => {
    if (!existing_bio) return;

    handle_input_change(USER_FORMSTATE.BIO, existing_bio, setFormState);
  };

  useEffect(() => {
    auto_fill_input_fields();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {/* Title + cancel btn */}
        <div className="w-full flex gap-4 justify-between items-center text-white text-lg">
          <span>Edit Bio</span>
          <i className="fas fa-xmark cursor-pointer" onClick={close_modal}></i>
        </div>
        {/* Form */}
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form_submit_handler}
        >
          {/* WYSIWYG Text editor */}
          <ReactQuill
            theme="snow"
            value={form_state.bio}
            onChange={(value) =>
              handle_input_change(USER_FORMSTATE.BIO, value, setFormState)
            }
            placeholder="Enter details about your orphanage"
            className={`bg-transparent !border-[1px] !border-dark/80 outline-none !font-inter rounded-md w-full h-[300px] text-dark/80  placeholder:!text-dark/80 first-letter:placeholder:capitalize text-[14px] sm:text-[19px] resize-none !overflow-auto !text-weak-white`}
          />
          {/* Save button */}
          <div className="w-full">
            <Button
              className="w-full"
              type="submit"
              disabled={form_submit_state.loading}
            >
              {form_submit_state.loading ? (
                <Loader type="button" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* The error state */}
      {form_submit_state.error && (
        <Snackbar
          open={form_submit_state.error ? true : false}
          onClose={() => form_submit_state.setError(undefined)}
          autoHideDuration={6000}
        >
          <Alert
            color="error"
            onClose={() => form_submit_state.setError(undefined)}
          >
            {form_submit_state.error}
          </Alert>
        </Snackbar>
      )}
      {/* The success state */}
      {form_submit_state.success && (
        <Snackbar
          open={form_submit_state.success ? true : false}
          autoHideDuration={6000}
          onClose={() => form_submit_state.setSuccess(undefined)}
        >
          <Alert
            color="success"
            onClose={() => form_submit_state.setSuccess(undefined)}
          >
            {form_submit_state.success}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default EditBio;
