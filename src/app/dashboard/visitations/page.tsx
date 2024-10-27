import RouteProtector from "@/components/RouteProtector.component";
import VisitationsGrid from "@/components/visitations/VisitationsGrid.component";
import VisitationsTitle from "@/components/visitations/VisitationsTitle.component";
import React from "react";

const Visitations = () => {
  return (
    <RouteProtector role="orphanage">
      <div className="flex flex-col space-y-10">
        {/* Title + filters */}
        <VisitationsTitle />

        {/* Visitations grid */}
        <VisitationsGrid />
      </div>
    </RouteProtector>
  );
};

export default Visitations;
