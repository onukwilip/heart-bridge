"use client";

import { useModalContext } from "@/contexts/Modal.context";
import { Visitation } from "@/utils/types";
import React from "react";
import VisitationDetailsModal from "./VisitationDetailsModal.component";
import { format } from "date-fns";
import { capitalize } from "@mui/material";

interface VisitationCardProps {
  visitation: Visitation;
}

const VisitationCard: React.FC<VisitationCardProps> = ({ visitation }) => {
  const { open_modal } = useModalContext();

  /**
   * * Function responsible for displaying the visitation details modal
   */
  const handleDetailModal = () => {
    open_modal({
      children: <VisitationDetailsModal visitation={visitation} />,
    });
  };

  return (
    <div className="flex w-full hover:bg-white/5 duration-300 flex-col space-y-2 bg-white/10 rounded-xl p-4 border-b-primary border-b-2">
      {/* Status + detail link */}
      <div className="flex justify-between items-center ">
        <p
          className={`text-sm font-bold text-${decideColor(
            visitation.visit_status
          )}`}
        >
          {capitalize(visitation.visit_status)}
        </p>
        <button className="underline" onClick={handleDetailModal}>
          details
        </button>
      </div>

      {/* visitor  name */}
      <h3 className="text-xl font-bold text-white">
        {visitation.visitor_name}
      </h3>

      {/* date */}
      <p>{format(visitation.visit_date, "dd MMM YYY")}</p>

      {/* Time */}
      <p>{format(visitation.visit_time, "hh:mm bb")}</p>
    </div>
  );
};

export default VisitationCard;

function decideColor(status: string): string {
  switch (status) {
    case "pending":
      return "golden";
    case "approved":
      return "green-500";
    case "rejected":
      return "red-500";
    default:
      return "white";
  }
}
