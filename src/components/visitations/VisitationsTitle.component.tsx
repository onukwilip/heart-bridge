import { MenuItem, Select } from "@mui/material";
import React from "react";

const VisitationsTitle = () => {
  return (
    <div className="flex justify-between items-center">
      {/* Title */}
      <h2 className="text-2xl text-white font-bold">Visitations</h2>

      <div className="flex items-center gap-x-2">
        {/* Filters for stage */}
        <Select
          variant="outlined"
          defaultValue="Upcoming"
          className="border text-white h-10 "
        >
          <MenuItem value="Upcoming">Upcoming</MenuItem>
          {/* <MenuItem value="Pending">Pending</MenuItem> */}
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>

        {/* Status filter */}
        <Select
          variant="outlined"
          defaultValue="All"
          className="border text-white h-10 "
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </Select>
      </div>
    </div>
  );
};

export default VisitationsTitle;
