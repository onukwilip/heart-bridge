import { useModalContext } from "@/contexts/Modal.context";
import { TUser, TUserLocation } from "@/utils/types";
import React, { FC, useEffect, useState } from "react";
import { FormControl } from "../atoms/FormControl.component";
import { Alert, Autocomplete, Snackbar, TextField } from "@mui/material";
import Button from "../atoms/Button.component";
import { get_places } from "@/actions/location.action";
import useFetch from "@/hooks/useFetch.hook";
import account from "@/utils/appwrite/appwrite_account.utils";

const EditContact: FC<{
  existing_information: TUser;
  user_id: string;
  post_submit_function: Function;
}> = ({ existing_information, post_submit_function, user_id }) => {
  const { close_modal } = useModalContext();
  const fetch_state = useFetch();
  const [places, setPlaces] = useState<TUserLocation[]>([]);
  const [entered_place, setEnteredPlace] = useState("");
  const [form_state, setFormState] = useState<TUserLocation>({
    lat: 0,
    lng: 0,
    address: {
      country: "",
      formatted_address: "",
      street: "",
      city: "",
      state: "",
    },
  });
  let timeout: NodeJS.Timeout;

  /**
   * * Function responsible for auto-filling the input fields with the existing bank information
   * @returns void
   */
  const auto_fill_input_fields = () => {
    if (!existing_information) return;
    setFormState((prev) => ({
      lat: existing_information?.location?.lat,
      lng: existing_information?.location?.lng,
      address: {
        country: existing_information.location?.address?.country,
        formatted_address:
          existing_information.location?.address?.formatted_address,
        street: existing_information.location?.address?.street,
        city: existing_information.location?.address?.city,
        state: existing_information.location?.address?.state,
      },
    }));
  };

  /**
   * * Function responsible for auto-filling the input fields with the existing bank information
   * @returns void
   */
  const search_place: (value: string) => void = async (value) => {
    timeout && clearTimeout(timeout);
    // * Display the loading state when places are being searched
    fetch_state.display_loading();
    setPlaces([]);

    timeout = setTimeout(async () => {
      try {
        // * Retrieve the corresponding places from the google maps places API
        const places = await get_places(value);

        // * if an error occurred/the places API returns undefined/null, display error
        if (!places) {
          return fetch_state.display_error("Error fetching places");
        }

        // * update the places, and display success
        setPlaces(places);
        fetch_state.display_success("");
      } catch (error) {
        // * If an error occurred/the places API returns undefined/null, display error
        console.error("Error fetching places", error);
        fetch_state.display_error("Error fetching places");
      }
    }, 5000);
  };

  /**
   * * Function responible for updating the user location
   * @param e The button click event handler.
   */
  const handle_update = async () => {
    try {
      // * Display the loading state when user location is being updated
      fetch_state.display_loading();

      // * Validate the form state before updating the user location
      if (
        !form_state.lat ||
        !form_state.lng ||
        !form_state.address.formatted_address
      )
        return fetch_state.display_error("Please enter a valid address");

      // * Update the user's location in the database
      const user = await account.updatePrefs<TUser>({
        ...existing_information,
        location: form_state,
      });

      // * if an error occurred, display error
      if (!user)
        return fetch_state.display_error(
          "An error occurred while updating your information, please try again"
        );

      // * Execute the function to be called aster successfull update
      await post_submit_function();

      // * Display success message and close the modal/drawer
      fetch_state.display_success("Successfully updated user location");
      close_modal();
    } catch (error) {
      // * If an error occurred, display the error message
      console.error(error);
      fetch_state.display_error((error as any).message);
    }
  };

  useEffect(() => {
    auto_fill_input_fields();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {/* Title + cancel btn */}
        <div className="w-full flex gap-4 justify-between items-center text-white text-lg">
          <span>Edit Contact Information</span>
          <i className="fas fa-xmark cursor-pointer" onClick={close_modal}></i>
        </div>
        {/* Filter location */}
        <FormControl variant="outlined" className="w-full" required>
          <Autocomplete
            options={places}
            onInputChange={(e, val) => setEnteredPlace(val)}
            loading={fetch_state.loading}
            filterOptions={(x) => x}
            filterSelectedOptions
            autoComplete
            includeInputInList
            getOptionLabel={(option) => option.address.formatted_address || ""}
            onChange={(e, val) => {
              if (!val) return;

              console.log("Changing auto complete", val);
              setFormState(val);
              setPlaces(places);
            }}
            renderInput={(params) => (
              <div className="flex w-full items-center gap-4">
                <TextField
                  {...params}
                  label="Enter location"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      search_place(entered_place);
                    }
                  }}
                />{" "}
                <i
                  className="fas fa-magnifying-glass text-2xl cursor-pointer transition !text-primary-grey hover:!text-primary"
                  onClick={async () => search_place(entered_place)}
                ></i>
              </div>
            )}
            renderOption={(props, option) => (
              <li {...props} key={`${option.lat}${option.lng}`}>
                {option.address.formatted_address}
              </li>
            )}
          />
        </FormControl>
        {/* Map */}
        {form_state.lat && form_state.lng && (
          <iframe
            src={
              "https://maps.google.com/maps?q=" +
              form_state.lat +
              "," +
              form_state.lng +
              "&t=&z=15&ie=UTF8&iwloc=&output=embed"
            }
            width="100%"
            height="150"
            style={{ border: 0 }}
            className={"w-full h-[150px] rounded-lg"}
            loading="lazy"
            {...{ referrerpolicy: "no-referrer-when-downgrade" }}
            title="map"
          ></iframe>
        )}
        {/* Button */}
        <Button
          className="w-full"
          disabled={
            form_state.address.formatted_address?.trim() === "" ||
            !form_state.address.formatted_address
          }
          onClick={handle_update}
        >
          Save
        </Button>
      </div>
      {/* Places API error state */}
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
    </>
  );
};

export default EditContact;
