import { useModalContext } from "@/contexts/Modal.context";
import { Visitation } from "@/utils/types";
import { MenuItem, Select } from "@mui/material";
import React from "react";
import Button from "../atoms/Button.component";

interface VisitationDetailsModalProps {
  visitation: Visitation;
}

const VisitationDetailsModal: React.FC<VisitationDetailsModalProps> = ({
  visitation,
}) => {
  const { close_modal } = useModalContext();

  return (
    <div className="flex flex-col gap-y-3">
      {/* Title + close */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Visitation Details</h2>
        <i
          className="fas fa-xmark cursor-pointer text-white"
          onClick={close_modal}
        ></i>
      </div>

      {/* Main detail box */}
      <div className="rounded p-4 flex flex-col gap-y-2">
        <div className="grid grid-cols-5 ">
          <p className="col-span-2">Visitor name:</p>
          <p className="col-span-3 text-white/70 font-semibold">
            Nkemdilim Nwanko
          </p>
        </div>

        <div className="grid grid-cols-5 ">
          <p className="col-span-2">Description:</p>
          <p className="col-span-3 text-white/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            omnis, soluta rerum praesentium facilis minima libero nesciunt
            laudantium officia maiores nam delectus et animi distinctio harum.
            Alias totam culpa similique.
          </p>
        </div>

        <div className="grid grid-cols-5 ">
          <p className="col-span-2">Date:</p>
          <p className="col-span-3 text-white/70">12/10/2020</p>
        </div>

        <div className="grid grid-cols-5 ">
          <p className="col-span-2">Time:</p>
          <p className="col-span-3 text-white/70">2:00 PM</p>
        </div>
      </div>

      {/* Status dropdown */}
      <Select
        variant="outlined"
        fullWidth
        defaultValue="pending"
        onChange={() => {}}
        className="text-white border-2 border-primary-grey"
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="pending">Approved</MenuItem>
        <MenuItem value="pending">Canceled</MenuItem>
      </Select>

      {/* Save */}
      <Button onClick={() => {}}>Save</Button>
    </div>
  );
};

export default VisitationDetailsModal;
