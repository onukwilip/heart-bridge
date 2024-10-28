import RouteProtector from "@/components/RouteProtector.component";
import VisitationsGrid from "@/components/visitations/VisitationsGrid.component";
import VisitationsTitle from "@/components/visitations/VisitationsTitle.component";
import React from "react";

const Visitations = () => {
  return (
    <div className="flex flex-col space-y-10">
      {/* Title + filters */}
      <VisitationsTitle />

      {/* Visitations grid */}
      <VisitationsGrid />
    </div>
  );
};

export default Visitations;
