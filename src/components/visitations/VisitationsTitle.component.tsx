"use client";

import { MenuItem, Select } from "@mui/material";
import React from "react";
import AvailabilitySwitch from "../AvailabilitySwitch.component";

const VisitationsTitle = () => {
  const [visitationsAvailability, setVisitationsAvailability] =
    React.useState(true);

  return (
    <div className="flex justify-between items-center">
      {/* Title */}
      <h2 className="text-2xl text-white font-bold">Visitations</h2>

      <div className="flex items-center gap-x-2">
        {/* Availability Switch */}
        <AvailabilitySwitch
          availability={visitationsAvailability}
          setAvailability={setVisitationsAvailability}
        />

        {/* Filters for stage */}
        <Select
          variant="outlined"
          defaultValue="Upcoming"
          className="border text-white h-10 "
        >
          <MenuItem className="menu-item" value="Upcoming">
            Upcoming
          </MenuItem>
          <MenuItem className="menu-item" value="Completed">
            Completed
          </MenuItem>
          <MenuItem className="menu-item" value="Canceled">
            Canceled
          </MenuItem>
        </Select>

        {/* Status filter */}
        <Select
          variant="outlined"
          defaultValue="All"
          className="border text-white h-10 "
        >
          <MenuItem className="menu-item" value="All">
            All
          </MenuItem>
          <MenuItem className="menu-item" value="Approved">
            Approved
          </MenuItem>
          <MenuItem className="menu-item" value="Pending">
            Pending
          </MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default VisitationsTitle;
