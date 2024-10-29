import { useModalContext } from "@/contexts/Modal.context";
import React, { FC, FormEvent, useEffect, useState } from "react";
import TextField from "../atoms/TextField.component";
import useFetch from "@/hooks/useFetch.hook";
import { Alert, Snackbar } from "@mui/material";
import { APPWRITE_BUCKET, USER_FORMSTATE, TUser } from "@/utils/types";
import { handle_input_change } from "@/utils/input.utils";
import Button from "../atoms/Button.component";
import Loader from "../atoms/Loader.component";
import Image from "next/image";
import dummy_profile from "@/images/dummy-profile-pic.png";
import storage from "@/utils/appwrite/appwrite_storage.utils";
import { ID } from "appwrite";
import { update_user_profile } from "@/actions/user_profile.action";

const EditUserProfile: FC<{
  existing_information: TUser;
  user_id: string;
  post_submit_function?: Function;
}> = ({ existing_information, user_id, post_submit_function }) => {
  const { close_modal } = useModalContext();
  const form_submit_state = useFetch();

  const [form_state, setFormState] = useState<
    Omit<TUser, "account_type"> & { image?: File }
  >({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    image: undefined,
    ...(existing_information.account_type === "orphanage"
      ? { orphanage_name: "" }
      : {}),
  });

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

      // * Set the value of the form loading state to true
      form_submit_state.display_loading();

      // * Generate a unique ID for the image to be uploaded
      const image_id = ID.unique();

      // * If the image was changed, i.e. a new image was uploaded, upload the image to appwrite storage
      const uploaded_image =
        typeof form_state.image === "object"
          ? await storage.createFile(
              APPWRITE_BUCKET.PROFILE_IMAGES,
              image_id,
              form_state.image as File
            )
          : undefined;

      // * Get the URL of the uploaded image
      const uploaded_image_url = uploaded_image
        ? await storage.getFilePreview(APPWRITE_BUCKET.PROFILE_IMAGES, image_id)
        : undefined;

      // * Update the user details
      await update_user_profile({
        $id: user_id,
        bio: existing_information.bio,
        ...form_state,
        image: uploaded_image_url || existing_information.image,
      });

      // * Display success message
      form_submit_state.display_success(
        "Successfully updated the user details"
      );
      post_submit_function && (await post_submit_function());
      // * Close the modal/drawer
      close_modal();
    } catch (error) {
      console.log(error);
      // * Display an error message
      form_submit_state.display_error((error as any).message || error);
    }
  };

  /**
   * * Function responsible for validating the uploaded file
   * @param e The form submit event
   * @returns void
   */
  const handle_image_change: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const file = e.target.files?.[0];

    // * If no file was uploaded, return
    if (!file) return;

    // * Extract the file extension
    const ext = file.name.split(".").pop() || "";

    // * Validate the uploaded file type, and display error message informing user to upload a valid image if unsupported
    if (!["png", "jpg", "jpeg"].includes(ext)) {
      return form_submit_state.display_error(
        "Unsupported file: Please upload .png, .jpeg or .jpg images"
      );
    }

    // * If the file size is greater than 2 MB, return error
    if (file.size > 1024 * 1024 * 2) {
      return form_submit_state.display_error(
        "Image too large: Please upload an image less than or equal to 2 MB"
      );
    }

    // * Update the form state with the selected file
    handle_input_change<File>("image", file, setFormState);
  };

  /**
   * * Function responsible for auto-filling the input fields with the existing bank information
   * @returns void
   */
  const auto_fill_input_fields = () => {
    if (!existing_information) return;

    handle_input_change(
      USER_FORMSTATE.FIRSTNAME,
      existing_information.firstname,
      setFormState
    );
    handle_input_change(
      USER_FORMSTATE.LASTNAME,
      existing_information.lastname,
      setFormState
    );
    handle_input_change(
      USER_FORMSTATE.EMAIL,
      existing_information.email,
      setFormState
    );
    handle_input_change(
      USER_FORMSTATE.ORPHANAGE_NAME,
      existing_information.orphanage_name as string,
      setFormState
    );
  };

  useEffect(() => {
    auto_fill_input_fields();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        {/* Title + cancel btn */}
        <div className="w-full flex gap-4 justify-between items-center text-white text-lg">
          <span>Edit Profile Information</span>
          <i className="fas fa-xmark cursor-pointer" onClick={close_modal}></i>
        </div>
        {/* Form */}
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form_submit_handler}
        >
          {/* Profile image */}
          <label
            htmlFor="image"
            className="w-full p-3 flex gap-3 rounded-lg border border-weak-grey items-center cursor-pointer transition hover:border-primary-grey !text-white"
          >
            {/* Image container + icon + overlay */}
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full relative before:w-full before:h-full before:rounded-full before:absolute before:top-0 before:left-0 before:bg-black/50 before:z-[5]">
              <Image
                width={50}
                height={50}
                alt={existing_information.firstname}
                src={
                  form_state.image && typeof form_state.image === "object"
                    ? URL.createObjectURL(form_state.image)
                    : existing_information.image || dummy_profile.src
                }
                className="w-[50px] h-[50px] object-cover"
              />
              <i className="fa-solid fa-camera-retro absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl z-20"></i>
            </div>
            <span>
              {form_state.image
                ? form_state.image.name
                : "Click to add profile image (image should not exceed 2MB)"}
            </span>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handle_image_change}
              hidden
            />
          </label>
          <div className="flex items-center justify-center w-full gap-3">
            {/* Firstname field */}
            <TextField
              name={USER_FORMSTATE.FIRSTNAME}
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
              name={USER_FORMSTATE.LASTNAME}
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
          {/* Orphanage name field */}
          {existing_information.account_type === "orphanage" && (
            <TextField
              name={USER_FORMSTATE.ORPHANAGE_NAME}
              label="Orphanage name"
              placeholder="Enter the orphanage name"
              onChange={(e) =>
                handle_input_change(e.target.name, e.target.value, setFormState)
              }
              value={form_state.orphanage_name}
              variant="outlined"
              className="w-full"
              required
            />
          )}

          {/* Email field */}
          <TextField
            name={USER_FORMSTATE.EMAIL}
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

export default EditUserProfile;
