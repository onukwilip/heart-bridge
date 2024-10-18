import React from "react";

/**
 * * Updates the form input states
 * @param name The nme of the input field. It should correspond with the name of the state object to be updated
 * @param value The value entered in the input/select field
 */
export const handle_input_change: (
  name: string,
  value: string,
  setFormState: React.Dispatch<React.SetStateAction<any>>
) => void = (name, value, setFormState) => {
  setFormState((prev: any) => ({
    ...prev,
    [name]: value,
  }));
};
