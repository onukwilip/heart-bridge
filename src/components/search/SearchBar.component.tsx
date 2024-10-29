"use client";
import React, { useState } from "react";
import { RoundedFormControl } from "../atoms/RoundedFormControl.component";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [show_search, setShowSearch] = useState(false);
  const [search_value, setSearchValue] = useState("");
  const router = useRouter();

  return (
    <div className="md:relative">
      <RoundedFormControl
        variant="outlined"
        className="w-[300px] !hidden md:!flex rounded-xl"
      >
        <InputLabel htmlFor="search">Search</InputLabel>
        <OutlinedInput
          value={search_value}
          onChange={(e) => setSearchValue(e.target.value)}
          onClick={() => {
            setShowSearch((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              router.push(`/search?type=orphanage&name=${search_value}`);
          }}
          endAdornment={
            <InputAdornment position="end">
              <i
                className={`fas fa-magnifying-glass text-2xl text-primary-grey`}
              ></i>
            </InputAdornment>
          }
          label="Search"
        />
      </RoundedFormControl>
      <i
        className={`fas fa-magnifying-glass inline-block md:!hidden text-primary-grey hover:text-primary-grey-dark`}
        onClick={() => {
          setShowSearch((prev) => !prev);
        }}
      ></i>
      {show_search && (
        <div className="absolute top-20 w-[300px] right-2 md:right-0 md:-left-4 md:top-[4rem] z-30 p-2 rounded bg-primary-dark text-primary-grey flex flex-col gap-3">
          <Link
            className="!text-primary"
            href={`/search?type=orphanage&name=${search_value}`}
          >
            Search orphanages
          </Link>
          <Link className="!text-primary" href={`/search?type=nearby`}>
            Search nearby orphanages
          </Link>
          <Link
            className="!text-primary"
            href={`/search?type=project&name=${search_value}`}
          >
            Search projects
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
