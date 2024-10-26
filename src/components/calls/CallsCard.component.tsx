"use client";

import { useModalContext } from "@/contexts/Modal.context";
import { Visitation } from "@/utils/types";
import React from "react";

interface VisitationCardProps {
  visitation: Visitation;
}

const CallsCard: React.FC<VisitationCardProps> = ({ visitation }) => {
  return (
    <div className="flex lg:min-w-[270px] flex-col space-y-2 bg-white/10 rounded-xl p-4 border-b-primary border-b-2">
      {/* Status + detail link */}
      <div className="flex justify-between items-center ">
        <p className="text-golden">Pending</p>
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

export default CallsCard;
