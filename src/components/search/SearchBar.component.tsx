import React from "react";
import { RoundedFormControl } from "../atoms/RoundedFormControl.component";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

const SearchBar = () => {
  return (
    <>
      <RoundedFormControl
        variant="outlined"
        className="w-[300px] !hidden md:!flex rounded-xl"
      >
        <InputLabel htmlFor="password">Search</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment position="end">
              <i
                className={`fas fa-magnifying-glass text-2xl text-primary-grey`}
              ></i>
            </InputAdornment>
          }
          label="Password"
        />
      </RoundedFormControl>
      <i
        className={`fas fa-magnifying-glass inline-block md:!hidden text-primary-grey hover:text-primary-grey-dark`}
      ></i>
    </>
  );
};

export default SearchBar;
