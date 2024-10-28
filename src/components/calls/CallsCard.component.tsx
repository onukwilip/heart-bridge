"use client";

import { useModalContext } from "@/contexts/Modal.context";
import { TCall, TVisitation } from "@/utils/types";
import { format } from "date-fns";
import React from "react";

interface VisitationCardProps {
  call: TCall;
}

const CallsCard: React.FC<VisitationCardProps> = ({ call }) => {
  return (
    <div className="flex w-full duration-300  flex-col space-y-2 bg-white/10 rounded-xl p-4 border-b-primary border-b-2">
      {/* Status + detail link */}
      <div className="flex justify-between items-center ">
        <p className="text-golden">Pending</p>
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
