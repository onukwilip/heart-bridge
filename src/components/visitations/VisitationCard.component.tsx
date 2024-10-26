"use client";

import { useModalContext } from "@/contexts/Modal.context";
import { Visitation } from "@/utils/types";
import React from "react";
import VisitationDetailsModal from "./VisitationDetailsModal.component";

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
    <div className="flex lg:min-w-[270px] flex-col space-y-2 bg-white/10 rounded-xl p-4 border-b-primary border-b-2">
      {/* Status + detail link */}
      <div className="flex justify-between items-center ">
        <p className="text-golden">Pending</p>
        <button className="underline" onClick={handleDetailModal}>
          details
        </button>
      </div>

      {/* visitor  name */}
      <h3 className="text-xl font-bold text-white">{visitation.visitor}</h3>

      {/* date */}
      <p>{visitation.date}</p>

      {/* Time */}
      <p>{visitation.time}</p>
    </div>
  );
};

export default VisitationCard;
