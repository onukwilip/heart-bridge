import { useModalContext } from "@/contexts/Modal.context";
import React, { FC, FormEvent, useEffect, useState } from "react";
import TextField from "../atoms/TextField.component";
import useFetch from "@/hooks/useFetch.hook";
import { Alert, Snackbar } from "@mui/material";
import {
  APPWRITE_BUCKET,
  APPWRITE_DATABASE,
  PROJECT_FORM,
  SIGNUP_FORMSTATE,
  TProject,
  TUser,
} from "@/utils/types";
import { handle_input_change } from "@/utils/input.utils";
import Button from "../atoms/Button.component";
import Loader from "../atoms/Loader.component";
import Image from "next/image";
import dummy_image from "@/images/dummy-image.jpg";
import storage from "@/utils/appwrite/appwrite_storage.utils";
import { ID } from "appwrite";
import database from "@/utils/appwrite/appwrite_database.utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateOrEditProject: FC<{
  existing_details?: TProject;
  user_id: string;
}> = ({ existing_details, user_id }) => {
  const { close_modal } = useModalContext();
  const form_submit_state = useFetch();

  const [form_state, setFormState] = useState<
    Omit<
      TProject,
      "$id" | "$createdAt" | "current_amount" | "donations" | "status"
    >
  >({
    title: "",
    description: "",
    goal: 0,
    images: [],
    user_id: existing_details?.user_id || user_id,
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

      let uploaded_images: string[] = [];

      // * Loop through the uploaded images
      for (const image of form_state.images) {
        // * If the image is a string, it means it's a URL of an existing image
        if (typeof image === "string") {
          uploaded_images.push(image);
          continue;
        }

        // * Generate a unique ID for the image to be uploaded
        const image_id = ID.unique();

        // * If a new image was uploaded/added to the existing images, upload the image to appwrite storage
        await storage.createFile(
          APPWRITE_BUCKET.PROJECT_IMAGES,
          image_id,
          image as File
        );

        // * Get the URL of the uploaded image
        const uploaded_image_url = await storage.getFilePreview(
          APPWRITE_BUCKET.PROJECT_IMAGES,
          image_id
        );

        uploaded_images.push(uploaded_image_url);
      }

      const params: [
        string,
        string,
        string,
        Omit<
          TProject,
          "$id" | "$createdAt" | "current_amount" | "donations" | "status"
        >
      ] = [
        APPWRITE_DATABASE.DB_ID,
        APPWRITE_DATABASE.PROJECTS_COLLECTION_ID,
        existing_details?.$id || ID.unique(),
        {
          ...form_state,
          goal: Number(form_state.goal),
          images: uploaded_images,
        },
      ];

      // * Create or Update the project details
      existing_details
        ? await database.updateDocument(
            params[0],
            params[1],
            params[2],
            params[3]
          )
        : await database.createDocument(
            params[0],
            params[1],
            params[2],
            params[3]
          );

      // * Display success message
      form_submit_state.display_success(
        "Successfully updated the project details"
      );
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

    // * Add the uploaded file to the list of uploaded images
    setFormState((prev) => ({ ...prev, images: [...prev.images, file] }));
  };

  /**
   * * Function responsible for auto-filling the input fields with the existing bank information
   * @returns void
   */
  const auto_fill_input_fields = () => {
    if (!existing_details) return;

    handle_input_change(
      PROJECT_FORM.TITLE,
      existing_details.title,
      setFormState
    );
    handle_input_change(
      PROJECT_FORM.DESCRIPTION,
      existing_details.description,
      setFormState
    );
    handle_input_change(PROJECT_FORM.GOAL, existing_details.goal, setFormState);
    handle_input_change(
      PROJECT_FORM.USER_ID,
      existing_details.user_id || user_id,
      setFormState
    );
    handle_input_change(
      PROJECT_FORM.IMAGES,
      existing_details.images,
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
          {/* Uploaded images */}
          <div className="flex gap-2 max-w-full overflow-x-auto">
            {form_state.images.map((image) => (
              <div className="w-[200px] h-[100px] rounded-md overflow-hidden relative">
                <Image
                  width={200}
                  height={100}
                  alt={existing_details?.title || ""}
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  className="w-[200px] h-[100px] object-cover"
                />
                <div
                  className="w-[20px] h-[20px] rounded-full !bg-white absolute top-1 right-1 flex items-center justify-center cursor-pointer hover:scale-110"
                  onClick={() =>
                    setFormState((prev) => ({
                      ...prev,
                      images: prev.images.filter(
                        (existing_image) => existing_image !== image
                      ),
                    }))
                  }
                >
                  <i className="fas fa-xmark cursor-pointer !text-red-600"></i>
                </div>
              </div>
            ))}
          </div>

          {/* Image place holder */}
          <label
            htmlFor="image"
            className="w-full p-3 flex gap-3 rounded-lg border border-weak-grey items-center cursor-pointer transition !text-white hover:border-primary-grey"
          >
            {/* Image container + icon + overlay */}
            <div className="w-[50px] h-[50px] overflow-hidden rounded-full relative before:w-full before:h-full before:rounded-full before:absolute before:top-0 before:left-0 before:bg-black/50 before:z-[5]">
              <Image
                width={50}
                height={50}
                alt={existing_details?.title || ""}
                src={dummy_image.src}
                className="w-[50px] h-[50px] object-cover"
              />
              <i className="fa-solid fa-camera-retro absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl z-20"></i>
            </div>
            <span>Click to add image (image should not exceed 2MB)</span>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handle_image_change}
              hidden
            />
          </label>
          {/* Title field */}
          <TextField
            name={PROJECT_FORM.TITLE}
            label="Title"
            placeholder="Enter project title"
            onChange={(e) =>
              handle_input_change(e.target.name, e.target.value, setFormState)
            }
            value={form_state.title}
            variant="outlined"
            className="w-full"
            required
          />
          {/* Description field */}
          <ReactQuill
            theme="snow"
            value={form_state.description}
            onChange={(value) =>
              handle_input_change(PROJECT_FORM.DESCRIPTION, value, setFormState)
            }
            placeholder="Enter details about your project"
            className={`bg-transparent !border-[1px] !border-dark/80 outline-none !font-inter rounded-md w-full h-[300px] text-dark/80  placeholder:!text-dark/80 first-letter:placeholder:capitalize text-[14px] sm:text-[19px] resize-none !overflow-auto !text-weak-white`}
          />
          {/* Project Goal */}
          <TextField
            name={PROJECT_FORM.GOAL}
            label="Goal"
            placeholder="Enter the target amount you're seeking to raise"
            type="number"
            onChange={(e) =>
              handle_input_change(e.target.name, e.target.value, setFormState)
            }
            value={form_state.goal}
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

export default CreateOrEditProject;
