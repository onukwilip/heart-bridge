import React from "react";
import VisitationCard from "./VisitationCard.component";
import { fakeVisitation } from "@/utils/constants.utils";

const VisitationsGrid = () => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-10 place-items-center ">
      {Array.from({ length: 12 }).map((_, index) => (
        <VisitationCard visitation={fakeVisitation[0]} key={index} />
      ))}
    </div>
  );
};

export default VisitationsGrid;
