"use client";

import { useModalContext } from "@/contexts/Modal.context";
import { TCall, TVisitation } from "@/utils/types";
import { format } from "date-fns";
import React from "react";
import CallDetailsModal from "./CallModal.component";
import { capitalize } from "@mui/material";

interface VisitationCardProps {
  call: TCall;
}

const CallsCard: React.FC<VisitationCardProps> = ({ call }) => {
  const { open_modal } = useModalContext();

  /**
   * * Function responsible for displaying the visitation details modal
   */
  const handleDetailModal = () => {
    open_modal({
      children: <CallDetailsModal call={call} />,
    });
  };

  return (
    <div
      className="flex w-full duration-300  flex-col space-y-2 bg-white/10 rounded-xl p-4 border-b-primary border-b-2 hover:bg-white/5 cursor-pointer"
      onClick={handleDetailModal}
    >
      {/* Status + detail link */}
      <div className="flex justify-between items-center ">
        <p className={`text-sm font-bold text-${decideColor(call.status)}`}>
          {capitalize(call.status)}
        </p>
      </div>

      {/* visitor  name */}
      <h3 className="text-xl font-bold text-white">{call.caller_name}</h3>

      {/* date */}
      <p>{format(call.call_date, "dd MMM yyy")}</p>

      {/* Time */}
      <p>{format(call.call_time, "hh:mm bb")}</p>
    </div>
  );
};

export default CallsCard;

function decideColor(status: string): string {
  switch (status) {
    case "pending":
      return "golden";
    case "approved":
      return "green-500";
    case "declined":
      return "red-500";
    default:
      return "white";
  }
}
