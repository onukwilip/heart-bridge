import React from "react";
import { fakeVisitation } from "@/utils/constants.utils";
import CallsCard from "./CallsCard.component";

const CallsGrid = () => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center ">
      {Array.from({ length: 12 }).map((_, index) => (
        <CallsCard visitation={fakeVisitation[0]} key={index} />
      ))}
    </div>
  );
};

export default CallsGrid;
