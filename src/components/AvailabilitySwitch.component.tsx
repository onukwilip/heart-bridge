"use client";

import { Switch } from "@mui/material";
import React from "react";

interface AvailabilitySwitchProps {
  availability: boolean;
  setAvailability: (availability: boolean) => void;
}

const AvailabilitySwitch: React.FC<AvailabilitySwitchProps> = ({
  availability,
  setAvailability,
}) => {
  return (
    <div className="flex gap-x-2 items-center">
      <p>Availability: </p>
      <Switch
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
        checked={availability}
        onChange={(e) => setAvailability(!availability)}
      />
    </div>
  );
};

export default AvailabilitySwitch;
